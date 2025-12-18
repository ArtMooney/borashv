import { defineStore } from "pinia";
import { useLoginStore } from "~/components/cms/stores/loginStore";

export const useCmsStore = defineStore("cmsStore", {
  state: () => ({
    tables: [],
    items: [],
    itemCopy: null,
    schema: [],
    tableId: "",
    tableType: "",
    showItem: 0,
    itemOpen: false,
    saveFlag: false,
    saveAllFlag: false,
    loadingFlag: true,
    editingItem: false,
    editingNewItem: false,
    inputError: false,
    formRefs: {},
  }),

  getters: {
    hasItems() {
      return this.items.length > 0;
    },

    hasSchema() {
      return this.schema.length > 0;
    },
  },

  actions: {
    async loadTables() {
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

        console.log(err);
      } finally {
        this.loadingFlag = false;
      }
    },

    async loadFields() {
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

        console.log(err);
      } finally {
        this.loadingFlag = false;
      }
    },

    async loadRows(sortOrder, fieldName) {
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
            field_name: fieldName,
            sort_order: sortOrder,
          },
        });
      } catch (err) {
        if (err.status === 401) {
          loginStore.logout();
          location.reload();
        }

        console.log(err);
      } finally {
        this.loadingFlag = false;
      }
    },

    cancelItem(index) {
      const items = JSON.parse(JSON.stringify(this.items));

      if (this.editingNewItem) {
        items.pop();
        this.items = items;
        this.itemOpen = false;
        this.editingNewItem = false;
        this.editingItem = false;
      } else if (index === this.showItem) {
        items[index] = this.itemCopy;
        this.items = items;
        this.itemOpen = false;
        this.editingItem = false;
      }
    },

    async saveItem(index) {
      if (index !== this.showItem) return;

      const loginStore = useLoginStore();
      const config = useRuntimeConfig();
      const item = this.items[index];
      const form = this.formRefs[index];

      if (!this.validateFields(item)) {
        form?.reportValidity();
        return;
      }

      this.saveFlag = true;

      try {
        const res = await $fetch(
          this.editingNewItem ? "/cms/add-item" : "/cms/save-item",
          {
            method: "POST",
            headers: {
              Authorization:
                "Basic " +
                btoa(config.public.userName + ":" + config.public.userPass),
            },
            body: {
              email: loginStore.email,
              password: loginStore.password,
              item: this.items[index],
              schema: this.schema,
              table_id: this.tableId,
            },
          },
        );

        const items = JSON.parse(JSON.stringify(this.items));
        items[index] = res;

        this.items = items;
        this.itemOpen = false;
        this.editingItem = false;
        this.editingNewItem = false;
      } catch (err) {
        if (err.status === 401) {
          loginStore.logout();
          location.reload();
        }

        console.log(err);
      } finally {
        this.saveFlag = false;
      }
    },

    async saveAllItems() {
      const loginStore = useLoginStore();
      const config = useRuntimeConfig();

      this.saveFlag = true;
      this.saveAllFlag = true;
      const items = JSON.parse(JSON.stringify(this.items));

      for (let [index, item] of items.entries()) {
        item.sortOrder = index.toString();
      }

      try {
        await $fetch("/cms/save-all-items", {
          method: "POST",
          headers: {
            Authorization:
              "Basic " +
              btoa(config.public.userName + ":" + config.public.userPass),
          },
          body: {
            email: loginStore.email,
            password: loginStore.password,
            items: items,
            schema: this.schema,
            table_id: this.tableId,
          },
        });

        this.itemOpen = false;
        this.saveFlag = false;
        this.saveAllFlag = false;
      } catch (err) {
        if (err.status === 401) {
          loginStore.logout();
          location.reload();
        }

        console.log(err);
      } finally {
        this.saveFlag = false;
        this.saveAllFlag = false;
      }
    },

    async deleteItem(index) {
      const loginStore = useLoginStore();
      const config = useRuntimeConfig();
      this.saveFlag = true;

      try {
        await $fetch("/cms/delete-item", {
          method: "POST",
          headers: {
            Authorization:
              "Basic " +
              btoa(config.public.userName + ":" + config.public.userPass),
          },
          body: {
            email: loginStore.email,
            password: loginStore.password,
            item: this.items[index],
            schema: this.schema,
            table_id: this.tableId,
          },
        });

        const items = JSON.parse(JSON.stringify(this.items));
        items.splice(index, 1);
        this.items = items;
        this.itemOpen = false;
        this.editingItem = false;
      } catch (err) {
        if (err.status === 401) {
          loginStore.logout();
          location.reload();
        }

        console.log(err);
      } finally {
        this.saveFlag = false;
      }
    },

    validateFields(item) {
      for (const config of this.schema) {
        if (config.hidden) continue;
        if (!config.required) continue;

        const key = config.name;
        const value = item[key];

        if (value === undefined || value === null) {
          return false;
        }

        if (typeof value === "string" && value.trim() === "") {
          return false;
        }

        if (Array.isArray(value) && value.length === 0) {
          return false;
        }

        if (
          typeof value === "object" &&
          value !== null &&
          !Array.isArray(value)
        ) {
          if (!value.name && !value.file) {
            return false;
          }
        }

        if (config.type === "checkbox" && value === false) {
          return false;
        }
      }

      return true;
    },
  },
});
