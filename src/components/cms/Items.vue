<script setup>
import { Drag, DropList } from "vue-easy-dnd";
import "vue-easy-dnd/dist/dnd.css";
import ItemTitle from "./ItemTitle.vue";
import LoadingSpinner from "../LoadingSpinner.vue";
import Input from "./Input.vue";
import { getLocalStorage } from "../../js/getLocalStorage.js";
import { listTable } from "../../js/listTable.js";
</script>

<template>
  <div class="mx-auto mt-8 max-w-screen-md justify-center gap-4">
    <LoadingSpinner
      v-if="loadingFlag"
      class="!h-12 !w-12 justify-self-center py-12"
      color="#fac725"
    />

    <div v-if="!items.length && !loadingFlag" class="py-16 text-center">
      No items found
    </div>

    <drop-list
      :items="localItems"
      @reorder="
        $event.apply(localItems);
        saveAllItems();
      "
    >
      <template v-slot:item="{ item, index }">
        <drag
          :delay="dragDelay"
          :vibration="dragVibration"
          @click="handleClick($event, index)"
          class="m-h-16 mb-4 grid grid-cols-2 rounded bg-black/25 p-4 shadow-[3px_4px_12px_rgba(0,0,0,0.22)]"
          v-show="!loadingFlag"
          :ref="`list-item-${index}`"
          :key="item"
          handle=".dragdrop-handle"
        >
          <ItemTitle
            :item="item"
            :index="index"
            :saving-item-flag="savingItemFlag"
            :saving-all-items-flag="savingAllItemsFlag"
            :show-item="showItem"
            :save-flag="saveFlag"
            :editing-new-item="editingNewItem"
          />

          <div
            class="col-span-2 grid grid-cols-[0.15fr,1fr] gap-3 text-sm"
            v-show="itemOpen && showItem === index"
          >
            <div class="col-span-2 my-4 h-px w-full bg-white/25"></div>

            <template v-for="input of schema">
              <div v-if="input.name !== 'index'">
                {{
                  input.name.includes("|")
                    ? input.name.split("|")[0]
                    : input.name
                }}
              </div>

              <Input
                :input="input"
                :item="item"
                :index="index"
                :localItems="localItems"
                @showItem="showItem = $event"
                @saveFlag="$emit('saveFlag', $event)"
                @localItems="localItems = $event"
              />
            </template>
          </div>
        </drag>
      </template>
      <template v-slot:feedback="{ data }"></template>
    </drop-list>
  </div>
</template>

<script>
export default {
  name: "CmsItems",

  props: {
    schema: {
      type: Array,
      required: false,
      default: [],
    },
    loadingFlag: {
      type: Boolean,
      required: false,
      default: false,
    },
    saveFlag: {
      type: Boolean,
      required: false,
      default: false,
    },
    editingNewItem: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data() {
    return {
      items: [],
      localItems: [],
      login: {},
      userName: `${import.meta.env.VITE_USERNAME}`,
      userPass: `${import.meta.env.VITE_USERPASS}`,
      showItem: 0,
      itemOpen: false,
      savingItemFlag: false,
      savingAllItemsFlag: false,
      dragDelay: 0,
      dragVibration: 100,
      showDateList: false,
      sortOrder: false,
    };
  },

  async created() {
    if (getLocalStorage("simple-cms-login")) {
      this.login = getLocalStorage("simple-cms-login");
    }

    this.loadData();
  },

  methods: {
    async loadData() {
      this.$emit("loadingFlag", true);

      if (this.schema.length > 0) {
        const items = await listTable(this.schema[0].table_id);
        this.items = items.results;

        // parse to-from date-fields to json array
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
        this.$emit("loadingFlag", false);
        this.$emit("initLoadedFlag", true);
      }
    },

    postFetch(urlEndpoint, headers, body) {
      return new Promise((resolve, reject) => {
        var requestOptions = {
          method: "POST",
          redirect: "follow",
        };

        if (headers !== null && headers !== undefined) {
          requestOptions.headers = headers;
        }

        if (body !== null && body !== undefined) {
          requestOptions.body = JSON.stringify(body);
        }

        fetch(urlEndpoint, requestOptions)
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

    handleClick(event, index) {
      if (this.showItem === index) {
        this.itemOpen = !this.itemOpen;
      } else {
        this.showItem = index;
        this.itemOpen = true;
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
            index === this.schema.name &&
            input.trim() !== "") ||
          (localObject !== itemsObject &&
            input !== null &&
            index !== this.schema.name)
        ) {
          modified = true;
        }
      }

      return modified;
    },

    getItemOrder(index) {
      let itemJson = {};
      itemJson = {};
      itemJson.index = index;
      itemJson.id = this.localItems[index].id;

      return itemJson;
    },

    async saveAllItems() {
      const itemArray = [];
      this.savingAllItemsFlag = true;
      this.$emit("saveFlag", true);

      for (const [index, item] of Object.entries(this.localItems)) {
        item.index = index;
        itemArray.push(this.getItemOrder(index));
      }

      const updateItems = await this.postFetch(
        `${import.meta.env.VITE_APP_CMS_URL}/update-batch`,
        new Headers({
          "Content-Type": "application/json",
          Authorization:
            "Basic " + btoa(`${this.login.email}:${this.login.password}`),
        }),
        {
          items: itemArray,
          tableid: this.schema.id,
          fields: this.schema,
        },
      );

      this.items = JSON.parse(JSON.stringify(this.localItems));
      this.savingAllItemsFlag = false;
      this.$emit("saveFlag", false);
    },
  },

  watch: {
    schema() {
      this.showItem = 0;
      this.itemOpen = false;
      this.loadData();
    },

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
          this.$emit("saveFlag", true);
        } else {
          this.$emit("saveFlag", false);
        }
      },
    },

    showItem() {
      if (this.showItem === 0) {
        this.dragDelay = 0;
      } else {
        this.dragDelay = 86400000;
      }
    },
  },
};
</script>
