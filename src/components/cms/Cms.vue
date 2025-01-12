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
      <TableList
        @tableIndex="schemaIndex = $event"
        @loadingFlag="loadingFlag = $event"
        @schema="schema = $event"
      />
      <AddRemoveItems :tables="schema" :tableIndex="schemaIndex" />

      <Items
        :schema="schema"
        :loading-flag="loadingFlag"
        @loadingFlag="loadingFlag = $event"
        @initLoadedFlag="$emit('initLoadedFlag', $event)"
      />

      <div
        v-if="savingItemFlag || savingAllItemsFlag"
        class="fixed bottom-0 left-0 right-0 top-0 z-[1000000] block bg-black"
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
      tables: [],
      schema: [],
      items: [],
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

  methods: {
    handleClickOutside(event) {
      if (event.target.className !== "sort-by-date") {
        this.showDateList = false;
      }
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
    schemaIndex() {
      this.showItem = false;
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
