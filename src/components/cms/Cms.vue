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
        :items="items"
        :schema="schema"
        :show-item="showItem"
        :item-open="itemOpen"
        :save-flag="saveFlag"
        :loading-flag="loadingFlag"
        :editing-new-item="editingNewItem"
        @items="items = $event"
        @showItem="showItem = $event"
        @itemOpen="itemOpen = $event"
        @saveFlag="saveFlag = $event"
        @loadingFlag="loadingFlag = $event"
      />

      <div
        v-if="saveFlag || loadingFlag"
        class="fixed bottom-0 left-0 right-0 top-0 z-[1000000] block bg-black/50"
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
      schema: [],
      showItem: 0,
      itemOpen: false,
      saveFlag: false,
      loadingFlag: true,
      editingNewItem: false,
    };
  },
};
</script>
