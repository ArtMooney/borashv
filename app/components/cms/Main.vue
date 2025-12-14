<template>
  <Teleport to="body">
    <div
      class="absolute top-0 left-0 z-20 min-h-screen w-full min-w-75 bg-[#363636] px-4 pb-24"
    >
      <CmsNavbar />
      <CmsTableList
        @loading-flag="loadingFlag = $event"
        @schema="schema = $event"
        @table-id="tableId = $event"
        @table-type="tableType = $event"
      />
      <CmsAddRemoveItems
        :items="items"
        :schema="schema"
        :tableId="tableId"
        :editing-new-item="editingNewItem"
        @items="items = $event"
        @show-item="showItem = $event"
        @item-open="itemOpen = $event"
        @editing-new-item="editingNewItem = $event"
        @save-new-item-order="saveNewItemOrder = $event"
      />
      <CmsItems
        :items="items"
        :schema="schema"
        :tableId="tableId"
        :tableType="tableType"
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
        class="fixed top-0 right-0 bottom-0 left-0 z-1000000 block bg-transparent"
      ></div>
    </div>
  </Teleport>
</template>

<script>
export default {
  name: "Main",

  emits: ["initLoadedFlag"],

  data() {
    return {
      items: [],
      schema: [],
      tableId: "",
      tableType: "",
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
