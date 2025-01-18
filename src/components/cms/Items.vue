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
          @click="handleClick($event, index)"
          class="m-h-16 mb-4 grid grid-cols-2 rounded bg-black/25 p-4 shadow-[3px_4px_12px_rgba(0,0,0,0.22)]"
          v-show="!loadingFlag"
          :ref="`list-item-${index}`"
          :key="item"
          handle=".dragdrop-handle"
        >
          <ItemTitle
            :item="item"
            :index="index"
            :show-item="showItem"
            :save-flag="saveFlag"
            :editing-new-item="editingNewItem"
          />

          <div
            class="col-span-2 grid grid-cols-[0.15fr,1fr] gap-3 text-sm"
            v-show="itemOpen && showItem === index"
          >
            <div class="col-span-2 my-4 h-px w-full bg-white/25"></div>

            <template v-for="input of schema">
              <div v-if="input.name !== 'index'">
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
                @showItem="$emit('showItem', $event)"
                @saveFlag="$emit('saveFlag', $event)"
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
    "initLoadedFlag",
    "saveFlag",
    "items",
    "showItem",
    "itemOpen",
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
  },

  data() {
    return {
      login: {},
      savingItemFlag: false,
      savingAllItemsFlag: false,
      dragDelay: 0,
      dragVibration: 100,
      showDateList: false,
      sortOrder: false,
    };
  },

  async created() {
    if (getLocalStorage("simple-cms-login")) {
      this.login = getLocalStorage("simple-cms-login");
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
        this.$emit("initLoadedFlag", true);
      }
    },

    handleClick(event, index) {},

    async saveAllItems() {},
  },

  watch: {
    schema() {
      this.$emit("showItem", 0);
      this.$emit("itemOpen", false);
      this.loadData();
    },

    showItem() {
      if (this.showItem === 0) {
        this.dragDelay = 0;
      } else {
        this.dragDelay = 86400000;
      }
    },
  },
};
</script>
