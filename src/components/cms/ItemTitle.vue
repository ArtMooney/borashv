<script setup>
import LoadingSpinner from "../LoadingSpinner.vue";
import { IonIcon } from "@ionic/vue";
import { grid, chevronDownOutline } from "ionicons/icons";
</script>

<template>
  <div class="flex cursor-pointer items-center gap-4">
    <ion-icon
      :icon="grid"
      class="dragdrop-handle h-6 w-6 shrink-0 cursor-grabbing text-white"
    ></ion-icon>

    <div class="pointer-events-none">
      {{ item.titel ? item.titel : item.name }}
    </div>
  </div>

  <div class="flex cursor-pointer justify-end gap-2">
    <div class="flex items-center gap-2">
      <div
        v-if="index === showItem && itemOpen"
        @click.stop="saveItem(index)"
        class="rounded border border-white/25 bg-[#8a548b] px-2 py-0.5 text-sm hover:bg-[#b280b4]"
        :class="[inputError ? 'opacity-50' : '']"
      >
        Save
      </div>

      <div
        v-if="index === showItem && itemOpen"
        @click.stop="$emit('cancelItem', index)"
        class="rounded border border-white/25 bg-[#8a548b] px-2 py-0.5 text-sm hover:bg-[#b280b4]"
      >
        Cancel
      </div>

      <div
        v-if="showItem !== index || !editingNewItem"
        @click.stop="$emit('deleteItem', index)"
        class="rounded border border-white/25 bg-[#8a548b] px-2 py-0.5 text-sm hover:bg-[#b280b4]"
      >
        Delete
      </div>
    </div>

    <div class="flex items-center gap-2">
      <ion-icon
        v-if="index !== showItem || !saveFlag"
        :icon="chevronDownOutline"
        class="h-6 w-6 text-white transition-transform duration-300 ease-in-out"
        :class="[index === showItem && itemOpen ? 'rotate-180' : '']"
      ></ion-icon>

      <LoadingSpinner
        v-if="index === showItem && saveFlag"
        class="!h-5 !w-5"
        color="#fac725"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "CmsItemTitle",

  emits: ["saveItem", "cancelItem", "deleteItem"],

  props: {
    item: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    showItem: {
      type: Number,
      required: false,
      default: 0,
    },
    itemOpen: {
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
    inputError: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  methods: {
    saveItem(index) {
      if (!this.inputError) {
        this.$emit("saveItem", index);
      }
    },
  },
};
</script>
