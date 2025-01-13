<script setup>
import LoadingSpinner from "../LoadingSpinner.vue";
import { IonIcon } from "@ionic/vue";
import { grid, chevronDownOutline } from "ionicons/icons";
</script>

<template>
  <div class="flex cursor-pointer items-center gap-4">
    <ion-icon :icon="grid" class="h-6 w-6 text-white"></ion-icon>

    <div class="pointer-events-none">
      {{ item.titel ? item.titel : item.name }}
    </div>
  </div>

  <div class="flex cursor-pointer justify-end gap-2">
    <div class="flex items-center gap-2">
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
        v-show="showItem !== index || !editingNewItem"
      >
        Delete
      </div>
    </div>

    <div class="flex items-center gap-2">
      <ion-icon
        v-if="
          (!savingItemFlag || (savingItemFlag && showItem !== index)) &&
          !savingAllItemsFlag
        "
        :icon="chevronDownOutline"
        class="h-6 w-6 text-white"
      ></ion-icon>

      <LoadingSpinner
        v-show="(savingItemFlag && showItem === index) || savingAllItemsFlag"
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
    editingNewItem: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>
