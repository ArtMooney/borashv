import { defineStore } from "pinia";

export const useCmsStore = defineStore("cmsStore", {
  state: () => ({
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
  }),

  getters: {
    hasItems() {
      return this.items.length > 0;
    },

    hasSchema() {
      return this.schema.length > 0;
    },

    isLoading() {
      return this.saveFlag || this.loadingFlag;
    },

    currentItem() {
      return this.items[this.showItem] || null;
    },
  },

  actions: {
    setItems(items) {
      this.items = items;
    },

    setSchema(schema) {
      this.schema = schema;
    },

    setTableId(tableId) {
      this.tableId = tableId;
    },

    setTableType(tableType) {
      this.tableType = tableType;
    },

    setShowItem(index) {
      this.showItem = index;
    },

    setItemOpen(isOpen) {
      this.itemOpen = isOpen;
    },

    setSaveFlag(flag) {
      this.saveFlag = flag;
    },

    setLoadingFlag(flag) {
      this.loadingFlag = flag;
    },

    setEditingNewItem(flag) {
      this.editingNewItem = flag;
    },

    setSaveNewItemOrder(flag) {
      this.saveNewItemOrder = flag;
    },

    resetState() {
      this.items = [];
      this.schema = [];
      this.tableId = "";
      this.tableType = "";
      this.showItem = 0;
      this.itemOpen = false;
      this.saveFlag = false;
      this.loadingFlag = true;
      this.editingNewItem = false;
      this.saveNewItemOrder = false;
    },
  },
});
