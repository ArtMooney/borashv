<script setup>
import { Vue3Lottie } from "vue3-lottie";
import loaderAnim from "../../assets/77076-loading.json";
import chevronDown from "../../assets/chevron-down.vue";
import gripVertical from "../../assets/grip-vertical.vue";
</script>

<template>
  <div class="flex items-center gap-4">
    <gripVertical style="color: white" class="dragdrop-handle" />

    <div class="pointer-events-none">
      {{ item.titel }}
    </div>
  </div>

  <!--  <div class="item-grid show4 bg-[coral]">-->
  <!--    <chevronDown-->
  <!--      v-if="-->
  <!--        (!savingItemFlag || (savingItemFlag && currentIndex !== index)) &&-->
  <!--        !savingAllItemsFlag-->
  <!--      "-->
  <!--      :class="[-->
  <!--        showItem === index-->
  <!--          ? 'arrow-down-white rotated w-embed'-->
  <!--          : 'arrow-down-white w-embed',-->
  <!--      ]"-->
  <!--    />-->

  <!--    <div-->
  <!--      class="loader-wrapper"-->
  <!--      v-show="(savingItemFlag && currentIndex === index) || savingAllItemsFlag"-->
  <!--    >-->
  <!--      <div class="loader-anim">-->
  <!--        <Vue3Lottie :animationData="loaderAnim" :height="60" :width="60" />-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->

  <div class="flex justify-end gap-2">
    <div class="item-grid">
      <div
        id="w-node-_0b476731-d8fb-2341-5ad4-24f0f7c9aac8-d10df2f5"
        v-if="showItem === index && saveFlag"
        @click.stop="saveItem(index, item)"
        :class="[
          blinkAnim === true
            ? 'cms-button controls w-button blinking'
            : 'cms-button controls w-button',
        ]"
      >
        Save
      </div>
      <div
        id="w-node-b1b7d981-a5e9-7138-58d8-3d72cfc97804-d10df2f5"
        v-if="showItem === index && saveFlag"
        @click.stop="cancelItem(index)"
        :class="[
          blinkAnim === true
            ? 'cms-button controls w-button blinking'
            : 'cms-button controls w-button',
        ]"
      >
        Cancel
      </div>
      <div
        id="w-node-_75f843bd-5bf3-9a52-8a05-85a2c9f5e6dc-d10df2f5"
        :class="[
          showItem === index
            ? 'cms-button controls w-button'
            : 'cms-button controls hide4 w-button',
        ]"
        @click.stop="deleteItem(index)"
        v-show="currentIndex !== index || !editingNewItem"
      >
        Delete
      </div>
    </div>
    <div
      id="w-node-_9213f67d-0cf0-9708-3dd0-d741737ab529-d10df2f5"
      class="item-grid hide4"
    >
      <chevronDown
        v-if="
          (!savingItemFlag || (savingItemFlag && currentIndex !== index)) &&
          !savingAllItemsFlag
        "
        id="w-node-_3a59ea88-5010-113e-e088-49750bc9b22a-d10df2f5"
        :class="[
          showItem === index
            ? 'arrow-down-white rotated w-embed'
            : 'arrow-down-white w-embed',
        ]"
      />
      <div
        id="w-node-e9ae915b-0548-dc33-9e2a-f43e8d03efd7-d10df2f5"
        class="loader-wrapper"
        v-show="
          (savingItemFlag && currentIndex === index) || savingAllItemsFlag
        "
      >
        <div class="loader-anim">
          <Vue3Lottie :animationData="loaderAnim" :height="60" :width="60" />
        </div>
      </div>
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
