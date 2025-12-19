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
      v-model="cmsStore.items"
      :delay="dragDelay"
      :animation="200"
      handle=".dragdrop-handle"
      @end="cmsStore.saveAllItems"
    >
      <div
        v-for="(item, index) of cmsStore.items"
        @click="handleClick($event, item, index)"
        class="mb-4 grid grid-cols-2 rounded bg-black/25 p-4 shadow-[3px_4px_12px_rgba(0,0,0,0.22)] hover:bg-[#242424]"
        v-show="!cmsStore.loadingFlag"
        :ref="`list-item-${index}`"
        :id="`list-item-${index}`"
        :key="item"
      >
        <CmsItemTitle :item="item" :index="index" />

        <form
          @submit.prevent
          :ref="(el) => (cmsStore.formRefs[index] = el)"
          @click.stop
          v-show="cmsStore.itemOpen && cmsStore.showItem === index"
          class="col-span-2 flex flex-col gap-3 text-sm"
        >
          <div class="my-4 h-px w-full bg-white/25"></div>

          <template v-for="input of cmsStore.schema">
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
      dragDelay: 0,
      dragVibration: 100,
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

  methods: {
    handleClick(event, item, index) {
      if (this.cmsStore.editingItem) return;

      this.cmsStore.itemCopy = this.deepClone(item);

      if (this.cmsStore.showItem === index) {
        this.cmsStore.showItem = index;
        this.cmsStore.itemOpen = !this.cmsStore.itemOpen;
      } else {
        this.cmsStore.showItem = index;
        this.cmsStore.itemOpen = true;
      }
    },

    deepClone(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
  },

  watch: {
    "cmsStore.itemOpen"() {
      this.dragDelay = this.cmsStore.itemOpen ? 86400000 : 0;

      if (this.cmsStore.itemOpen) {
        this.inputErrorIndex = Array(this.cmsStore.schema.length - 1).fill(
          null,
        );
      }
    },

    "cmsStore.items": {
      handler(newVal) {
        if (!this.cmsStore.itemOpen) return;

        this.cmsStore.editingItem =
          JSON.stringify(newVal[this.cmsStore.showItem]) !==
          JSON.stringify(this.cmsStore.itemCopy);
      },

      immediate: true,
      deep: true,
    },

    "cmsStore.schema"() {
      if (this.cmsStore.tableType === "statistics") {
        console.log(this.cmsStore.items);
        console.log(this.cmsStore.schema);
        console.log(this.cmsStore.tableType);

        // detta är i statistics, nästa steg bör vara att hitta en koppling med bokningar
        // och föra över de rader där tiden har passerat dagens datum
      }
    },
  },
};
</script>
