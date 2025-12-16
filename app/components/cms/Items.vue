<script setup>
import { VueDraggableNext } from "vue-draggable-next";
</script>

<template>
  <div class="mx-auto mt-8 max-w-3xl justify-center gap-4" id="items-list-top">
    <CmsLoadingSpinner
      v-if="cmsStore.loadingFlag"
      size="large"
      class="mx-auto justify-self-center"
    />

    <div
      v-if="!cmsStore.hasItems && !cmsStore.loadingFlag"
      class="py-16 text-center"
    >
      No items found
    </div>

    <VueDraggableNext
      v-model="localItems"
      :delay="dragDelay"
      :animation="200"
      handle=".dragdrop-handle"
      @end="saveAllItems"
    >
      <div
        v-for="(item, index) of localItems"
        @click="handleClick($event, item, index)"
        class="mb-4 grid grid-cols-2 rounded bg-black/25 p-4 shadow-[3px_4px_12px_rgba(0,0,0,0.22)] hover:bg-[#242424]"
        v-show="!cmsStore.loadingFlag"
        :ref="`list-item-${index}`"
        :id="`list-item-${index}`"
        :key="item"
      >
        <CmsItemTitle :item="item" :index="index" />

        <form
          @submit.prevent="saveItem(index)"
          :ref="`formEl${index}`"
          @click.stop
          v-show="cmsStore.itemOpen && cmsStore.showItem === index"
          class="col-span-2 flex flex-col gap-3 text-sm"
        >
          <div class="my-4 h-px w-full bg-white/25"></div>

          <template v-for="(input, inputIndex) of cmsStore.schema">
            <CmsInputs
              v-if="input.name !== 'index'"
              :input="input"
              :item="item"
              :index="index"
            />
          </template>

          <button type="submit" class="hidden"></button>
        </form>
      </div>
    </VueDraggableNext>
  </div>
</template>

<script>
import { useLoginStore } from "~/components/cms/stores/loginStore";
import { useCmsStore } from "~/components/cms/stores/cmsStore";

export default {
  name: "CmsItems",

  data() {
    const config = useRuntimeConfig();

    return {
      userName: config.public.userName,
      userPass: config.public.userPass,
      localItems: [],
      dragDelay: 0,
      dragVibration: 100,
      editingItem: false,
      itemCopy: null,
      inputErrorIndex: [],
    };
  },

  computed: {
    loginStore() {
      return useLoginStore();
    },

    cmsStore() {
      return useCmsStore();
    },
  },

  async mounted() {
    await this.loadData();
  },

  methods: {
    async loadData() {
      this.cmsStore.setLoadingFlag(true);

      if (this.cmsStore.schema.length > 0) {
        let items = await this.listRows(this.cmsStore.tableId);

        if (this.cmsStore.tableType === "statistics") {
          // console.log(cmsStore.items);
          // console.log(this.cmsStore.schema);
          // console.log(this.cmsStore.tableType);
          //
          // detta är i statistics, nästa steg bör vara att hitta en koppling med bokningar
          // och föra över de rader där tiden har passerat dagens datum
        }

        this.cmsStore.setItems(this.deepClone(items));
        this.cmsStore.setLoadingFlag(false);
      }
    },

    async listRows(tableid) {
      try {
        return await $fetch("/cms/rows", {
          method: "POST",
          headers: {
            Authorization: "Basic " + btoa(this.userName + ":" + this.userPass),
          },
          body: JSON.stringify({
            email: this.loginStore.email,
            password: this.loginStore.password,
            table_id: tableid,
            asc: true,
            order_by: "sortOrder",
          }),
        });
      } catch (err) {
        console.log(err);
      }
    },

    handleClick(event, item, index) {
      if (this.editingItem) return;

      this.itemCopy = this.deepClone(item);

      if (this.cmsStore.showItem === index) {
        this.cmsStore.setShowItem(index);
        this.cmsStore.setItemOpen(!this.cmsStore.itemOpen);
      } else {
        this.cmsStore.setShowItem(index);
        this.cmsStore.setItemOpen(true);
      }
    },

    async saveAllItems() {
      this.cmsStore.setSaveFlag(true);
      this.cmsStore.setSaveAllFlag(true);
      const items = this.deepClone(this.localItems);

      for (let [index, item] of items.entries()) {
        item.sortOrder = index.toString();
      }

      try {
        await $fetch("/cms/save-all-items", {
          method: "POST",
          headers: {
            Authorization: "Basic " + btoa(this.userName + ":" + this.userPass),
          },
          body: JSON.stringify({
            email: this.loginStore.email,
            password: this.loginStore.password,
            items: items,
            schema: this.cmsStore.schema,
            table_id: this.cmsStore.tableId,
          }),
        });

        this.cmsStore.setItemOpen(false);
        this.cmsStore.setSaveFlag(false);
        this.cmsStore.setSaveAllFlag(false);
      } catch (err) {
        console.log(err);

        this.cmsStore.setSaveFlag(false);
        this.cmsStore.setSaveAllFlag(false);
      }
    },

    async saveItem(index) {
      if (index !== this.cmsStore.showItem) return;

      const item = this.localItems[index];
      const form = this.$refs[`formEl${index}`][0];

      if (!this.validateFields(item)) {
        form?.reportValidity();
        return;
      }

      this.cmsStore.setSaveFlag(true);

      try {
        const res = await $fetch(
          this.cmsStore.editingNewItem ? "/cms/add-item" : "/cms/save-item",
          {
            method: "POST",
            headers: {
              Authorization:
                "Basic " + btoa(this.userName + ":" + this.userPass),
            },
            body: JSON.stringify({
              email: this.loginStore.email,
              password: this.loginStore.password,
              item: this.localItems[index],
              schema: this.cmsStore.schema,
              table_id: this.cmsStore.tableId,
            }),
          },
        );

        const items = this.deepClone(this.localItems);
        items[index] = res;

        this.cmsStore.setItems(items);
        this.cmsStore.setItemOpen(false);
        this.cmsStore.setSaveFlag(false);
        this.cmsStore.setEditingNewItem(false);
        this.editingItem = false;
      } catch (err) {
        console.log(err);

        this.cmsStore.setSaveFlag(false);
      }
    },

    cancelItem(index) {
      const items = this.deepClone(this.localItems);

      if (this.cmsStore.editingNewItem) {
        items.pop();

        this.cmsStore.setItems(items);
        this.cmsStore.setItemOpen(false);
        this.cmsStore.setEditingNewItem(false);
        this.editingItem = false;
      } else if (index === this.cmsStore.showItem) {
        items[index] = this.itemCopy;

        this.cmsStore.setItems(items);
        this.cmsStore.setItemOpen(false);
        this.editingItem = false;
      }
    },

    async deleteItem(index) {
      this.cmsStore.setSaveFlag(true);

      try {
        await $fetch("/cms/delete-item", {
          method: "POST",
          headers: {
            Authorization: "Basic " + btoa(this.userName + ":" + this.userPass),
          },
          body: JSON.stringify({
            email: this.loginStore.email,
            password: this.loginStore.password,
            item: this.localItems[index],
            schema: this.cmsStore.schema,
            table_id: this.cmsStore.tableId,
          }),
        });

        const items = this.deepClone(this.localItems);
        items.splice(index, 1);
        this.cmsStore.setItems(items);
        this.cmsStore.setItemOpen(false);
        this.editingItem = false;
        this.cmsStore.setSaveFlag(false);
      } catch (err) {
        console.log(err);

        this.cmsStore.setSaveFlag(false);
      }
    },

    validateFields(item) {
      for (const config of this.cmsStore.schema) {
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

    deepClone(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
  },

  watch: {
    "cmsStore.schema"() {
      this.editingItem = false;
      this.cmsStore.setInputError(false);
      this.cmsStore.setShowItem(0);
      this.cmsStore.setItemOpen(false);
      this.cmsStore.setEditingNewItem(false);
      this.loadData();
    },

    "cmsStore.itemOpen"() {
      this.dragDelay = this.cmsStore.itemOpen ? 86400000 : 0;

      if (this.cmsStore.itemOpen) {
        this.inputErrorIndex = Array(this.cmsStore.schema.length - 1).fill(
          null,
        ); // do not include index
      }
    },

    "cmsStore.items": {
      handler(newVal) {
        this.localItems = this.deepClone(newVal);

        if (!this.cmsStore.itemOpen) return;

        if (
          JSON.stringify(newVal[this.cmsStore.showItem]) ===
          JSON.stringify(this.itemCopy)
        ) {
          this.editingItem = false;
        } else {
          this.editingItem = true;
        }
      },

      immediate: true,
      deep: true,
    },

    localItems: {
      handler(newVal) {
        if (!this.cmsStore.itemOpen) return;

        if (
          JSON.stringify(newVal[this.cmsStore.showItem]) ===
          JSON.stringify(this.itemCopy)
        ) {
          this.editingItem = false;
        } else {
          this.editingItem = true;
        }
      },

      deep: true,
    },

    "cmsStore.saveNewItemOrder"() {
      if (this.cmsStore.saveNewItemOrder) {
        this.saveAllItems();
        this.cmsStore.setSaveNewItemOrder(false);
      }
    },

    "cmsStore.saveTrigger"() {
      this.saveItem(this.cmsStore.saveItem);
    },

    "cmsStore.cancelTrigger"() {
      this.cancelItem(this.cmsStore.cancelItem);
    },

    "cmsStore.deleteTrigger"() {
      this.deleteItem(this.cmsStore.deleteItem);
    },
  },
};
</script>
