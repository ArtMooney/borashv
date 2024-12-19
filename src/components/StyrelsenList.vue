<script setup>
import LoadingSpinner from "./LoadingSpinner.vue";
import { listTable } from "../js/listTable.js";
</script>

<template>
  <div class="grid grid-cols-1 gap-2 px-8 py-12 lg:grid-cols-8 lg:px-0">
    <h4
      class="col-start-1 col-end-1 text-3xl uppercase lg:col-start-2 lg:col-end-8"
    >
      Styrelsen
    </h4>

    <LoadingSpinner
      v-if="!itemsLoaded && !showErrorMessage"
      class="col-start-1 col-end-1 lg:col-start-2 lg:col-end-8"
    />

    <div
      v-if="itemsLoaded"
      class="col-start-1 col-end-1 flex flex-row flex-wrap justify-start lg:col-start-2 lg:col-end-8"
    >
      <div
        v-for="item of sortedItems"
        :key="item.id"
        class="relative w-[25rem] text-xs sm:w-[16rem] md:w-[21rem] md:text-sm xl:w-[19rem]"
      >
        <img src="../assets/dogtag.png" :alt="item.name" />
        <div
          class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pb-5 pr-4 md:pb-8 md:pr-8"
        >
          <span class="text-base font-bold md:text-lg">{{ item.name }}</span
          ><br />
          {{ item.title }}<br v-if="item.title" />
          {{ item.email }}<br v-if="item.email" />
          {{ item.phone }}<br v-if="item.phone" />
        </div>
      </div>
    </div>

    <div
      v-if="showErrorMessage"
      class="col-start-1 col-end-1 bg-[#a38373] p-4 text-black lg:col-start-2 lg:col-end-8"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: "StyrelsenList",

  data() {
    return {
      items: {},
      itemsLoaded: false,
      errorMessage: "",
      showErrorMessage: false,
    };
  },

  computed: {
    sortedItems() {
      return [...this.items].sort((a, b) => a.id - b.id);
    },
  },

  async created() {
    this.items = await listTable(`${import.meta.env.VITE_BASEROW_STYRELSEN}`);

    if (this.items.error) {
      this.errorMessage = "Något gick fel när listan skulle hämtas.";
      this.itemsLoaded = false;
      this.showErrorMessage = true;
    } else if (this.items.results.length > 0) {
      this.items = this.items.results;
      this.itemsLoaded = true;
    } else {
      this.errorMessage =
        "Kan inte ladda några personer från styrelsen för tillfället.";
      this.itemsLoaded = false;
      this.showErrorMessage = true;
    }
  },
};
</script>
