<script setup>
import LoadingSpinner from "./LoadingSpinner.vue";
</script>

<template>
  <div
    id="bokningslista"
    class="grid grid-cols-1 gap-2 px-8 py-12 lg:grid-cols-8 lg:px-0"
  >
    <h4
      class="col-start-1 col-end-1 text-3xl uppercase lg:col-start-2 lg:col-end-8"
    >
      Bokningslista
    </h4>

    <LoadingSpinner
      v-if="!itemsLoaded && !showErrorMessage"
      class="col-start-1 col-end-1 lg:col-start-2 lg:col-end-8"
    />

    <div
      v-if="itemsLoaded"
      v-for="item of items"
      class="col-start-1 col-end-1 cursor-pointer border border-white/15 bg-gradient-to-r from-[#32382d] to-[#353238] p-4 transition-colors duration-300 ease-in-out hover:from-[#343a2e] hover:to-[#37343a] hover:shadow-[0_0_20px_rgba(185,177,99,0.35)] lg:col-start-2 lg:col-end-8"
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
  name: "Bokningar",

  data() {
    return {
      items: {},
      itemsLoaded: false,
      errorMessage: "",
      showErrorMessage: false,
    };
  },

  created() {
    this.getCmsData(`${import.meta.env.VITE_BASEROW_BOKNINGAR}`);
  },

  methods: {
    getCmsData(tableid) {
      fetch(
        `https://api.baserow.io/api/database/rows/table/${tableid}/?user_field_names=true&order_by=index`,
        {
          headers: {
            Authorization:
              "Token " + `${import.meta.env.VITE_BASEROW_CLIENT_TOKEN}`,
          },
        },
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
