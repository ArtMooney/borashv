<script setup>
import Navbar from "./Navbar.vue";
import TableList from "./TableList.vue";
import AddRemoveItems from "./AddRemoveItems.vue";
import Items from "./Items.vue";
</script>

<template>
  <teleport to="body">
    <div
      @click="handleClickOutside"
      class="absolute top-0 z-20 min-h-screen w-full bg-[#363636]"
    >
      <Navbar />
      <TableList :tables="schema" @tableIndex="schemaIndex = $event" />
      <AddRemoveItems :tables="schema" :tableIndex="schemaIndex" />

      <div v-if="!localItems.length && !loadingFlag" class="py-16 text-center">
        No items found
      </div>

      <Items
        :schema="schema"
        :items="items"
        :localItems="localItems"
        :loading-flag="loadingFlag"
        @loadingFlag="loadingFlag = $event"
      />

      <div
        v-if="savingItemFlag || savingAllItemsFlag"
        class="bottom-o fixed left-0 right-0 top-0 z-[1000000] block bg-black"
      ></div>
    </div>
  </teleport>
</template>

<script>
export default {
  name: "Cms",

  emits: ["initLoadedFlag"],

  data() {
    return {
      schema: [],
      items: [],
      localItems: [],
      login: {},
      userName: `${import.meta.env.VITE_USERNAME}`,
      userPass: `${import.meta.env.VITE_USERPASS}`,
      baserowClientToken: `${import.meta.env.VITE_BASEROW_CLIENT_TOKEN}`,
      showItem: false,
      saveFlag: false,
      savingItemFlag: false,
      savingAllItemsFlag: false,
      currentIndex: false,
      schemaIndex: 0,
      loadingFlag: true,
      initLoadedFlag: false,
      dragDelay: 0,
      editingNewItem: false,
      selectDate: new Date(),
      showDateList: false,
    };
  },

  async created() {
    if (this.getLocalStorage("simple-cms-login")) {
      this.login = this.getLocalStorage("simple-cms-login");
    }

    this.loadingFlag = true;

    const res = await fetch("/list-tables", {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(`${this.userName}:${this.userPass}`),
      },
      body: JSON.stringify({
        email: this.login.email,
        password: this.login.password,
      }),
    });

    this.schema = await res.json();
    console.log("TABLES", this.schema);

    for (const schema of this.schema) {
      schema.fields = await this.getFetch(
        `https://api.baserow.io/api/database/fields/table/${schema.id}/`,
        new Headers({ Authorization: "Token " + this.baserowClientToken }),
      );
    }

    this.loadData();
  },

  methods: {
    getFetch(urlEndpoint, headers, options) {
      return new Promise((resolve, reject) => {
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        if (headers !== null && headers !== undefined) {
          requestOptions.headers = headers;
        }

        fetch(urlEndpoint + (options ? "?" + options : ""), requestOptions)
          .then((response) => {
            if (!response.ok) throw new Error();
            return response.json();
          })
          .then((result) => {
            // console.log(result);
            resolve(result);
          })
          .catch((error) => {
            // console.log(error);
            reject(error);
          });
      });
    },

    async loadData() {
      this.loadingFlag = true;

      this.items = await fetch(
        `https://api.baserow.io/api/database/rows/table/${
          this.schema[this.schemaIndex].id
        }/?size=200&user_field_names=true`,
        { headers: { Authorization: "Token " + this.baserowClientToken } },
      )
        .then((response) => response.json())
        .then((data) => data.results);

      this.items.sort((a, b) => {
        const indexA = a.index;
        const indexB = b.index;
        return indexA - indexB; // Ascending order
      });

      // parse to-from date-fields to json
      for (const item of this.items) {
        for (const field of Object.entries(item)) {
          if (field[0].includes("|") && field[0].includes("to-from")) {
            if (item[field[0]]) {
              item[field[0]] = JSON.parse(item[field[0]]);
            }
          }
        }
      }

      this.localItems = JSON.parse(JSON.stringify(this.items));

      this.loadingFlag = false;
      this.initLoadedFlag = true;
      this.$emit("initLoadedFlag", true);
    },

    handleClickOutside(event) {
      if (event.target.className !== "sort-by-date") {
        this.showDateList = false;
      }
    },

    isItemChanged(localItems, items) {
      if ((!items && !localItems) || this.editingNewItem) return null;

      let modified = false;

      for (const [index, input] of Object.entries(localItems)) {
        const localObject = JSON.stringify(input);
        const itemsObject = JSON.stringify(items[index]);

        if (
          (localObject !== itemsObject &&
            index === this.schema[this.schemaIndex].fields[0].name &&
            input.trim() !== "") ||
          (localObject !== itemsObject &&
            input !== null &&
            index !== this.schema[this.schemaIndex].fields[0].name)
        ) {
          modified = true;
        }
      }

      return modified;
    },

    getLocalStorage(name) {
      const itemStr = localStorage.getItem(name);

      if (!itemStr) {
        return null;
      }

      const item = JSON.parse(itemStr);
      const now = new Date();

      if (now.getTime() > item.expiry) {
        localStorage.removeItem(name);
        return null;
      }
      return item.value;
    },
  },

  watch: {
    localItems: {
      deep: true,
      handler(allInputs) {
        if (this.currentIndex === false || this.editingNewItem) return;

        if (
          this.isItemChanged(
            allInputs[this.currentIndex],
            this.items[this.currentIndex],
          )
        ) {
          this.saveFlag = true;
        } else {
          this.saveFlag = false;
        }
      },
    },

    schemaIndex() {
      this.showItem = false;
      this.loadData();
      window.scrollTo(0, 0);
    },

    showItem() {
      if (this.showItem === false) {
        this.dragDelay = 0;
      } else {
        this.dragDelay = 86400000;
      }
    },

    selectDate(date) {
      this.selectDate = date;
    },
  },
};
</script>
