<script setup>
import chevronDown from "../../assets/chevron-down.vue";
import gripVertical from "../../assets/grip-vertical.vue";
import LoadingSpinner from "../LoadingSpinner.vue";
</script>

<template>
  <div class="flex items-center gap-4">
    <gripVertical style="color: white" class="dragdrop-handle" />

    <div class="pointer-events-none">
      {{ item.titel }}
    </div>
  </div>

  <div class="flex justify-end gap-2">
    <div class="flex gap-2">
      <div
        v-if="showItem === index && saveFlag"
        @click.stop="saveItem(index, item)"
        class="rounded border border-white/25 bg-[#8a548b] px-2 py-0.5 text-sm hover:bg-[#b280b4]"
      >
        Save
      </div>

      <div
        v-if="showItem === index && saveFlag"
        @click.stop="cancelItem(index)"
        class="rounded border border-white/25 bg-[#8a548b] px-2 py-0.5 text-sm hover:bg-[#b280b4]"
      >
        Cancel
      </div>

      <div
        class="rounded border border-white/25 bg-[#8a548b] px-2 py-0.5 text-sm hover:bg-[#b280b4]"
        @click.stop="deleteItem(index)"
        v-show="currentIndex !== index || !editingNewItem"
      >
        Delete
      </div>
    </div>

    <div class="flex items-center gap-2">
      <chevronDown
        v-if="
          (!savingItemFlag || (savingItemFlag && currentIndex !== index)) &&
          !savingAllItemsFlag
        "
        class="h-5 w-5"
      />

      <LoadingSpinner
        v-show="
          (savingItemFlag && currentIndex === index) || savingAllItemsFlag
        "
        class="!h-5 !w-5"
        color="#fac725"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "CmsItemTitle",

  props: {
    item: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    savingItemFlag: {
      type: Boolean,
      required: false,
      default: false,
    },
    currentIndex: {
      type: Number,
      required: false,
      default: 0,
    },
    savingAllItemsFlag: {
      type: Boolean,
      required: false,
      default: false,
    },
    showItem: {
      type: Number,
      required: false,
      default: 0,
    },
    saveFlag: {
      type: Boolean,
      required: false,
      default: false,
    },
    blinkAnim: {
      type: Boolean,
      required: false,
      default: false,
    },
    editingNewItem: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data() {
    return {};
  },

  methods: {
    async saveItem(index, item) {},

    async cancelItem(index) {},

    deleteItem(index) {},
  },

  watch: {},
};
</script>
