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
      class="absolute left-0 top-0 z-20 min-h-screen w-full bg-[#363636] px-4"
    >
      <Navbar />
      <TableList
        @tableIndex="tableIndex = $event"
        @loadingFlag="loadingFlag = $event"
        @schema="schema = $event"
      />
      <AddRemoveItems
        :tables="schema"
        :tableIndex="tableIndex"
        :saveFlag="saveFlag"
        @editingNewItem="editingNewItem = $event"
      />
      <Items
        :schema="schema"
        :loading-flag="loadingFlag"
        :editing-new-item="editingNewItem"
        @loadingFlag="loadingFlag = $event"
        @initLoadedFlag="$emit('initLoadedFlag', $event)"
        @saveFlag="saveFlag = $event"
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
