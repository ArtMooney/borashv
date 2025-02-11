<script setup>
import { Drag, DropList } from "vue-easy-dnd";
import "vue-easy-dnd/dist/dnd.css";
import ItemTitle from "./ItemTitle.vue";
import LoadingSpinner from "../LoadingSpinner.vue";
import Input from "./Input.vue";
import { getLocalStorage } from "../../js/getLocalStorage.js";
import { listTable } from "../../js/listTable.js";
</script>

<template>
  <div
    class="mx-auto mt-8 max-w-screen-md justify-center gap-4"
    id="items-list-top"
  >
    <LoadingSpinner
      v-if="loadingFlag"
      class="!h-12 !w-12 justify-self-center py-12"
      color="#fac725"
    />

    <div v-if="!items.length && !loadingFlag" class="py-16 text-center">
      No items found
    </div>

    <drop-list
      :items="items"
      @reorder="
        $event.apply(items);
        saveAllItems();
      "
    >
      <template v-slot:item="{ item, index }">
        <drag
          :delay="dragDelay"
          :vibration="dragVibration"
          @click="handleClick($event, item, index)"
          class="mb-4 grid grid-cols-2 rounded bg-black/25 p-4 shadow-[3px_4px_12px_rgba(0,0,0,0.22)] hover:bg-[#242424]"
          v-show="!loadingFlag"
          :ref="`list-item-${index}`"
          :key="item"
          handle=".dragdrop-handle"
        >
          <ItemTitle
            :item="item"
            :index="index"
            :show-item="showItem"
            :item-open="itemOpen"
            :save-flag="saveFlag"
            :save-all-flag="saveAllFlag"
            :editing-new-item="editingNewItem"
            :input-error="inputError"
            @save-item="saveItem($event)"
            @cancel-item="cancelItem($event)"
            @delete-item="deleteItem($event)"
          />

          <div
            class="col-span-2 grid grid-cols-[0.15fr,1fr] gap-3 text-sm"
            v-show="itemOpen && showItem === index"
            @click.stop
          >
            <div class="col-span-2 my-4 h-px w-full bg-white/25"></div>

            <template v-for="(input, inputIndex) of schema">
              <div v-if="input.name !== 'index'" class="whitespace-nowrap">
                {{
                  input.name.includes("|")
                    ? input.name.split("|")[0]
                    : input.name
                }}
              </div>

              <Input
                :input="input"
                :item="item"
                :index="index"
                :item-open="itemOpen"
                @show-item="$emit('showItem', $event)"
                @save-flag="$emit('saveFlag', $event)"
                @input-error="handleInputError($event, inputIndex)"
              />
            </template>
          </div>
        </drag>
      </template>
      <template v-slot:feedback="{ data }"></template>
    </drop-list>
  </div>
  <div id="items-list-bottom"></div>
</template>

<script>
export default {
  name: "CmsItems",

  emits: [
    "loadingFlag",
    "saveFlag",
    "items",
    "showItem",
    "itemOpen",
    "editingNewItem",
    "saveNewItemOrder",
  ],

  props: {
    schema: {
      type: Array,
      required: false,
      default: [],
    },
    loadingFlag: {
      type: Boolean,
      required: false,
      default: false,
    },
    saveFlag: {
      type: Boolean,
      required: false,
      default: false,
    },
    editingNewItem: {
      type: Boolean,
      required: false,
      default: false,
    },
    items: {
      type: Array,
      required: false,
      default: [],
    },
    showItem: {
      type: Number,
      required: false,
    },
    itemOpen: {
      type: Boolean,
      required: false,
    },
    saveNewItemOrder: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data() {
    return {
      userName: `${import.meta.env.VITE_USERNAME}`,
      userPass: `${import.meta.env.VITE_USERPASS}`,
      login: {},
      dragDelay: 0,
      dragVibration: 100,
      editingItem: false,
      itemCopy: null,
      inputError: false,
      inputErrorIndex: [],
      saveAllFlag: false,
    };
  },

  async created() {
    if (getLocalStorage("borashv-cms")) {
      this.login = getLocalStorage("borashv-cms");
    }

    this.loadData();
  },

  methods: {
    async loadData() {
      this.$emit("loadingFlag", true);

      if (this.schema.length > 0) {
        let items = await listTable(this.schema[0].table_id);
        items = items.results;

        // parse to-from date-fields to json array
        for (const item of items) {
          for (const field of Object.entries(item)) {
            if (field[0].includes("|") && field[0].includes("to-from")) {
              if (item[field[0]]) {
                item[field[0]] = JSON.parse(item[field[0]]);
              }
            }
          }
        }

        this.$emit("items", JSON.parse(JSON.stringify(items)));
        this.$emit("loadingFlag", false);
      }
    },

    handleClick(event, item, index) {
      if (this.editingItem) return;

      this.itemCopy = JSON.parse(JSON.stringify(item));

      if (this.showItem === index) {
        this.$emit("showItem", index);
        this.$emit("itemOpen", !this.itemOpen);
      } else {
        this.$emit("showItem", index);
        this.$emit("itemOpen", true);
      }
    },

    async saveAllItems() {
      this.$emit("saveFlag", true);
      this.saveAllFlag = true;
      const items = JSON.parse(JSON.stringify(this.items));

      for (let [index, item] of items.entries()) {
        item.index = index.toString();
        item = this.processDateFormats(item);
      }

      const res = await fetch("/save-all-items", {
        method: "POST",
        headers: {
          Authorization: "Basic " + btoa(`${this.userName}:${this.userPass}`),
        },
        body: JSON.stringify({
          email: this.login.email,
          password: this.login.password,
          items: { items: items },
          schema: this.schema,
        }),
      });

      const response = await res.json();

      if (response.error) {
        console.log(response.error);
        this.$emit("saveFlag", false);
        this.saveAllFlag = false;

        return;
      }

      this.$emit("itemOpen", false);
      this.$emit("saveFlag", false);
      this.saveAllFlag = false;
    },

    async saveItem(index) {
      if (index === this.showItem) {
        this.$emit("saveFlag", true);
        const item = this.processDateFormats(
          JSON.parse(JSON.stringify(this.items[index])),
        );

        const res = await fetch(
          !this.editingNewItem ? "/save-item" : "/add-item",
          {
            method: "POST",
            headers: {
              Authorization:
                "Basic " + btoa(`${this.userName}:${this.userPass}`),
            },
            body: JSON.stringify({
              email: this.login.email,
              password: this.login.password,
              item: item,
              schema: this.schema,
            }),
          },
        );

        const response = await res.json();

        if (response.error) {
          console.log(response.error);
          this.$emit("saveFlag", false);

          return;
        }

        if (this.editingNewItem) {
          const items = JSON.parse(JSON.stringify(this.items));
          items[index] = response;
          this.$emit("items", items);
        }

        this.$emit("itemOpen", false);
        this.$emit("saveFlag", false);
        this.$emit("editingNewItem", false);
        this.editingItem = false;
      }
    },

    cancelItem(index) {
      if (this.editingNewItem) {
        const items = JSON.parse(JSON.stringify(this.items));
        items.pop();

        this.$emit("items", JSON.parse(JSON.stringify(items)));
        this.$emit("itemOpen", false);
        this.$emit("editingNewItem", false);
        this.editingItem = false;
      } else if (index === this.showItem) {
        const items = JSON.parse(JSON.stringify(this.items));
        items[index] = this.itemCopy;

        this.$emit("itemOpen", false);
        this.$emit("items", JSON.parse(JSON.stringify(items)));
        this.editingItem = false;
      }
    },

    async deleteItem(index) {
      this.$emit("saveFlag", true);

      const res = await fetch("/delete-item", {
        method: "POST",
        headers: {
          Authorization: "Basic " + btoa(`${this.userName}:${this.userPass}`),
        },
        body: JSON.stringify({
          email: this.login.email,
          password: this.login.password,
          table_id: this.schema.find((item) => item.table_id)?.table_id,
          row_id: this.items[index].id,
        }),
      });

      const response = await res.json();

      if (response.error) {
        console.log(response.error);
        this.$emit("saveFlag", false);

        return;
      }

      const items = JSON.parse(JSON.stringify(this.items));
      items.splice(index, 1);
      this.editingItem = false;
      this.$emit("itemOpen", false);
      this.$emit("items", JSON.parse(JSON.stringify(items)));
      this.$emit("saveFlag", false);
    },

    processDateFormats(item) {
      for (const field of this.schema) {
        if (field.type === "date") {
          item[field.name] = this.convertDateToIso(item[field.name]);
        }

        if (field.name.includes("|") && field.name.includes("to-from")) {
          item[field.name] = JSON.stringify(item[field.name]);
        }
      }

      return item;
    },

    convertDateToIso(date) {
      if (!date) return null;

      const originalDate = date;
      const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;

      if (isoDatePattern.test(originalDate)) {
        return originalDate;
      } else {
        return new Date(originalDate).toISOString().split("T")[0]; // extract only the date part
      }
    },

    handleInputError(event, index) {
      this.inputErrorIndex[index] = event;
      this.inputError = !!this.inputErrorIndex.find((input) => input);
    },
  },

  watch: {
    schema() {
      this.editingItem = false;
      this.inputError = false;
      this.$emit("showItem", 0);
      this.$emit("itemOpen", false);
      this.$emit("editingNewItem", false);
      this.loadData();
    },

    itemOpen() {
      this.dragDelay = this.itemOpen ? 86400000 : 0;

      if (this.itemOpen) {
        this.inputErrorIndex = Array(this.schema.length - 1).fill(null); // do not include index
      }
    },

    items: {
      handler(newVal, oldVal) {
        if (!this.itemOpen) return;

        if (
          JSON.stringify(newVal[this.showItem]) ===
          JSON.stringify(this.itemCopy)
        ) {
          this.editingItem = false;
        } else {
          this.editingItem = true;
        }
      },
      deep: true,
    },

    saveNewItemOrder() {
      if (this.saveNewItemOrder) {
        this.saveAllItems();
        this.$emit("saveNewItemOrder", false);
      }
    },
  },
};
</script>
