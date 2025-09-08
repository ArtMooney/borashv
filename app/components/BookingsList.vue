<script setup>
import LoadingSpinner from "./LoadingSpinner.vue";
import { listTable } from "../js/listTable.js";
</script>

<template>
  <div id="bokningslista" class="grid grid-cols-1 gap-2 px-4 py-12 md:px-8">
    <h4 class="text-3xl uppercase">Bokningslista</h4>

    <LoadingSpinner v-if="!itemsLoaded && !showErrorMessage" />

    <div
      v-if="itemsLoaded"
      v-for="item of items"
      class="cursor-pointer border border-white/15 bg-gradient-to-r from-[#32382d] to-[#353238] p-4 transition-colors duration-300 ease-in-out hover:from-[#343a2e] hover:to-[#37343a] hover:shadow-[0_0_20px_rgba(185,177,99,0.35)]"
    >
      <div class="grid grid-cols-2">
        <div
          class="mr-2 flex flex-col gap-2 border-r-2 border-white/15 text-xs md:text-sm"
        >
          <p class="text-gray-400 underline">
            {{ displayToFromDate(item["datum|to-from"]) }}
          </p>

          <div
            class="bold hyphens-auto break-words font-gunplay text-xl lg:text-2xl"
            lang="sv"
          >
            {{ item.titel }}
          </div>
        </div>

        <div class="flex flex-col gap-0.5 text-xs md:text-sm">
          <p>{{ item.lokal ? "Lokal: " + item.lokal : "" }}</p>
          <p>{{ item.org ? "Org: " + item.org : "" }}</p>
          <p>{{ item.tid ? "Tid: " + item.tid : "" }}</p>
        </div>
      </div>
    </div>

    <div v-if="showErrorMessage" class="bg-[#a38373] p-4 text-black">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Bokningar",

  data() {
    return {
      items: {},
      itemsLoaded: false,
      errorMessage: "",
      showErrorMessage: false,
    };
  },

  async created() {
    this.items = await listTable(`${import.meta.env.VITE_BASEROW_BOKNINGAR}`);

    if (this.items.error) {
      this.errorMessage = "Något gick fel när bokningarna skulle hämtas.";
      this.itemsLoaded = false;
      this.showErrorMessage = true;
    } else if (this.items.results.length > 0) {
      this.items = this.items.results;
      this.itemsLoaded = true;
    } else {
      this.errorMessage = "Det finns inga bokningar för tillfället.";
      this.itemsLoaded = false;
      this.showErrorMessage = true;
    }
  },

  methods: {
    displayToFromDate(date) {
      if (!date) return;
      date = JSON.parse(date);
      if (date) {
        if (date[0] === date[1]) {
          // output only first
          return this.formatDate(date[0]);
        } else {
          // output both
          return `${this.formatDate(date[0])} - ${this.formatDate(date[1])}`;
        }
      }

      return "";
    },

    formatDate(date) {
      let dateObj = new Date(date);
      let day = dateObj.getDate();
      let months = [
        "Januari",
        "Februari",
        "Mars",
        "April",
        "Maj",
        "Juni",
        "Juli",
        "Augusti",
        "September",
        "Oktober",
        "November",
        "December",
      ];
      let month = months[dateObj.getMonth()];
      let year = dateObj.getFullYear();

      return `${day} ${month} ${year}`;
    },
  },
};
</script>
