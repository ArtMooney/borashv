<script setup>
import LoadingSpinner from "./LoadingSpinner.vue";
</script>

<template>
  <div class="grid grid-cols-1 gap-2 px-8 py-12 lg:px-0">
    <h4 class="col-start-1 col-end-1 text-3xl uppercase">Styrelsen</h4>

    <LoadingSpinner v-if="!itemsLoaded && !showErrorMessage" class="" />

    <div v-if="itemsLoaded" v-for="item of items" class="">
      <div class="">
        <div class="mr-2 flex flex-col gap-2 text-xs md:text-sm">
          {{ item.name }}
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

  created() {
    this.getCmsData(`${import.meta.env.VITE_BASEROW_STYRELSEN}`);
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
