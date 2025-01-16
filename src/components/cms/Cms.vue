<script setup>
import Navbar from "./Navbar.vue";
import TableList from "./TableList.vue";
import AddRemoveItems from "./AddRemoveItems.vue";
import Items from "./Items.vue";
</script>

<template>
  <Teleport to="body">
    <div
      @click="handleClickOutside"
      class="absolute left-0 top-0 z-20 min-h-screen w-full bg-[#363636] px-4"
    >
      <Navbar />
      <TableList
        @loadingFlag="loadingFlag = $event"
        @schema="schema = $event"
      />
      <AddRemoveItems :items="items" :schema="schema" />
      <Items
        :schema="schema"
        :loading-flag="loadingFlag"
        :editing-new-item="editingNewItem"
        :local-items="localItems"
        :show-item="showItem"
        :item-open="itemOpen"
        :save-flag="saveFlag"
        @loadingFlag="loadingFlag = $event"
        @initLoadedFlag="$emit('initLoadedFlag', $event)"
        @saveFlag="saveFlag = $event"
        @localItems="localItems = $event"
        @showItem="showItem = $event"
        @itemOpen="itemOpen = $event"
      />

      <div
        v-if="savingItemFlag || savingAllItemsFlag"
        class="fixed bottom-0 left-0 right-0 top-0 z-[1000000] block bg-black"
      ></div>
    </div>
  </Teleport>
</template>

<script>
export default {
  name: "Cms",

  emits: ["initLoadedFlag"],

  data() {
    return {
      items: [],
      tables: [],
      schema: [],
      localItems: [],
      showItem: 0,
      itemOpen: false,
      saveFlag: false,
      savingItemFlag: false,
      savingAllItemsFlag: false,
      tableIndex: 0,
      loadingFlag: true,
      showDateList: false,
      editingNewItem: false,
    };
  },

  methods: {
    handleClickOutside(event) {
      if (event.target.className !== "sort-by-date") {
        this.showDateList = false;
      }
    },
  },

  watch: {
    tableIndex() {
      window.scrollTo(0, 0);
    },
  },
};
</script>
