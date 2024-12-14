<script setup>
import LoadingSpinner from "./LoadingSpinner.vue";
</script>

<template>
  <div class="p-8">
    <LoadingSpinner v-if="!itemsLoaded && !showErrorMessage" />

    <div
      v-if="itemsLoaded"
      v-for="item of items"
      class="mb-4 cursor-pointer border border-white/15 bg-[#32382d] p-4 hover:bg-[#43493e]"
    >
      <div class="flex flex-col gap-0.5 text-xs md:text-sm">
        <p class="mb-2 text-gray-400 underline">
          {{ displayToFromDate(item["datum|to-from"]) }}
        </p>

        <div class="bold mb-2 font-gunplay text-lg">{{ item.titel }}</div>

        <p>{{ item.lokal ? "Lokal: " + item.lokal : "" }}</p>
        <p>{{ item.org ? "Org: " + item.org : "" }}</p>
        <p>{{ item.tid ? "Tid: " + item.tid : "" }}</p>
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
      baserowClientToken: "ut84FNQWZzasN9CHp3Wgg9DX9ymhZcje",
    };
  },

  created() {
    this.getCmsData("218350");
  },

  methods: {
    getCmsData(tableid) {
      fetch(
        `https://api.baserow.io/api/database/rows/table/${tableid}/?user_field_names=true&order_by=index`,
        { headers: { Authorization: "Token " + this.baserowClientToken } },
      )
        .then((response) => {
          if (!response.ok) throw new Error();
          return response.json();
        })
        .then((result) => {
          this.items = result.results;
          if (Object.keys(this.items).length > 0) {
            this.itemsLoaded = true;
          } else {
            this.itemsLoaded = false;
            this.errorMessage = "Det finns inga aktiviteter för tillfället.";
            this.showErrorMessage = true;
          }
        })
        .catch((error) => {
          console.log(error);
          this.itemsLoaded = false;
          this.errorMessage = "Något gick fel när aktiviteterna skulle hämtas.";
          this.showErrorMessage = true;
        });
    },

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
