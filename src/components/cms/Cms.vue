<script setup>
import Navbar from "./Navbar.vue";
import TableList from "./TableList.vue";
import AddRemoveItems from "./AddRemoveItems.vue";
import Items from "./Items.vue";
</script>

<template>
  <Teleport to="body">
    <div
      class="absolute left-0 top-0 z-20 min-h-screen w-full min-w-[480px] bg-[#363636] px-4 pb-24"
    >
      <Navbar />
      <TableList
        @loading-flag="loadingFlag = $event"
        @schema="schema = $event"
      />
      <AddRemoveItems
        :items="items"
        :schema="schema"
        :editing-new-item="editingNewItem"
        @items="items = $event"
        @show-item="showItem = $event"
        @item-open="itemOpen = $event"
        @editing-new-item="editingNewItem = $event"
        @save-new-item-order="saveNewItemOrder = $event"
      />
      <Items
        :items="items"
        :schema="schema"
        :show-item="showItem"
        :item-open="itemOpen"
        :save-flag="saveFlag"
        :loading-flag="loadingFlag"
        :editing-new-item="editingNewItem"
        :save-new-item-order="saveNewItemOrder"
        @items="items = $event"
        @show-item="showItem = $event"
        @item-open="itemOpen = $event"
        @save-flag="saveFlag = $event"
        @loading-flag="loadingFlag = $event"
        @editing-new-item="editingNewItem = $event"
        @save-new-item-order="saveNewItemOrder = $event"
      />

      <div
        v-if="saveFlag || loadingFlag"
        class="fixed bottom-0 left-0 right-0 top-0 z-[1000000] block bg-transparent"
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
      saveNewItemOrder: false,
    };
  },
};
</script>
