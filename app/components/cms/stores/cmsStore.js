import { defineStore } from "pinia";
import { useLoginStore } from "~/components/cms/stores/loginStore";

export const useCmsStore = defineStore("cmsStore", {
  state: () => ({
    tables: [],
    items: [],
    schema: [],
    tableId: "",
    tableType: "",
    showItem: 0,
    itemOpen: false,
    saveFlag: false,
    saveAllFlag: false,
    loadingFlag: true,
    editingNewItem: false,
    saveNewItemOrder: false,
    inputError: false,
    saveItem: null,
    saveTrigger: 0,
    cancelItem: null,
    cancelTrigger: 0,
    deleteItem: null,
    deleteTrigger: 0,
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

    setSaveAllFlag(flag) {
      this.saveAllFlag = flag;
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

    setInputError(flag) {
      this.inputError = flag;
    },

    setSaveItem(index) {
      if (this.inputError) return;
      this.saveTrigger++;
      this.saveItem = index;
    },

    setCancelItem(index) {
      this.cancelTrigger++;
      this.cancelItem = index;
    },

    setDeleteItem(index) {
      this.deleteTrigger++;
      this.deleteItem = index;
    },

    async listTables() {
      this.loadingFlag = true;
      const loginStore = useLoginStore();
      const config = useRuntimeConfig();

      try {
        this.tables = await $fetch("/cms/tables", {
          method: "POST",
          headers: {
            Authorization:
              "Basic " +
              btoa(config.public.userName + ":" + config.public.userPass),
          },
          body: {
            email: loginStore.email,
            password: loginStore.password,
          },
        });
      } catch (err) {
        if (err.status === 401) {
          loginStore.logout();
          location.reload();
        }
      } finally {
        this.loadingFlag = false;
      }
    },

    async listFields() {
      this.loadingFlag = true;
      const loginStore = useLoginStore();
      const config = useRuntimeConfig();

      try {
        this.schema = await $fetch("/cms/fields", {
          method: "POST",
          headers: {
            Authorization:
              "Basic " +
              btoa(config.public.userName + ":" + config.public.userPass),
          },
          body: {
            email: loginStore.email,
            password: loginStore.password,
            table_id: this.tableId,
          },
        });
      } catch (err) {
        if (err.status === 401) {
          loginStore.logout();
          location.reload();
        }
      } finally {
        this.loadingFlag = false;
      }
    },

    async listRows() {
      if (!this.hasSchema) return;

      this.loadingFlag = true;
      const loginStore = useLoginStore();
      const config = useRuntimeConfig();

      try {
        this.items = await $fetch("/cms/rows", {
          method: "POST",
          headers: {
            Authorization:
              "Basic " +
              btoa(config.public.userName + ":" + config.public.userPass),
          },
          body: {
            email: loginStore.email,
            password: loginStore.password,
            table_id: this.tableId,
            asc: true,
            order_by: "sortOrder",
          },
        });
      } catch (err) {
        console.log(err);
      } finally {
        this.loadingFlag = false;
      }
    },
  },
});
