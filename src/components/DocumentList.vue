<script setup>
import LoadingSpinner from "./LoadingSpinner.vue";
import { listTable } from "../js/listTable.js";
</script>

<template>
  <div class="grid grid-cols-1 gap-2 px-4 py-12 md:px-8">
    <h4 class="text-3xl uppercase">Dokument</h4>

    <p class="pb-12">Här kan du ladda ner våra protokoll och stadgar</p>

    <LoadingSpinner
      v-if="!itemsLoaded && !showErrorMessage"
      class="col-start-1 col-end-1 lg:col-start-2 lg:col-end-8"
    />

    <a
      v-if="itemsLoaded"
      v-for="item of items"
      :href="item['file|doc'][0]?.url ? item['file|doc'][0].url : ''"
      target="_blank"
      class="flex cursor-pointer flex-row items-center justify-between border border-white/15 bg-gradient-to-r from-[#32382d] to-[#353238] p-4 transition-colors duration-300 ease-in-out hover:from-[#343a2e] hover:to-[#37343a] hover:shadow-[0_0_20px_rgba(185,177,99,0.35)]"
    >
      <div
        class="bold hyphens-auto break-words pr-4 font-gunplay text-xl lg:text-2xl"
        lang="sv"
      >
        {{ item.name }}
      </div>

      <div class="flex-shrink-0 border-l-2 border-white/15 pl-4">
        <img
          :src="item.thumbnail[0].url"
          :alt="item['file|doc'][0]?.url ? item['file|doc'][0].url : ''"
          class="h-32 w-auto"
        />
      </div>
    </a>

    <div v-if="showErrorMessage" class="bg-[#a38373] p-4 text-black">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: "DocumentList",

  data() {
    return {
      items: {},
      itemsLoaded: false,
      errorMessage: "",
      showErrorMessage: false,
    };
  },

  async created() {
    this.items = await listTable(`${import.meta.env.VITE_BASEROW_DOKUMENT}`);

    if (this.items.error) {
      this.errorMessage = "Något gick fel när dokumenten skulle hämtas.";
      this.itemsLoaded = false;
      this.showErrorMessage = true;
    } else if (this.items.results.length > 0) {
      this.items = this.items.results;
      this.itemsLoaded = true;
    } else {
      this.errorMessage = "Det finns inga dokument för tillfället.";
      this.itemsLoaded = false;
      this.showErrorMessage = true;
    }
  },
};
</script>
