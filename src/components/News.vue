<script setup>
import LoadingSpinner from "./LoadingSpinner.vue";
import Button from "../elements/Button.vue";
</script>

<template>
  <div class="px-8 py-16">
    <h4 class="text-3xl uppercase">Nyheter</h4>

    <LoadingSpinner v-if="!itemsLoaded && !showErrorMessage" />

    <div
      v-if="itemsLoaded"
      v-for="item of items"
      class="mb-4 border border-white/15 bg-[#32382d] p-4"
    >
      <div class="flex flex-col gap-4 text-xs sm:flex-row sm:text-sm">
        <div class="w-full sm:min-h-36 sm:w-36 sm:min-w-36">
          <img
            v-if="item.bild && item.bild[0]"
            :src="item.bild[0].thumbnails.card_cover.url"
            class="h-full w-full object-cover"
          />
        </div>

        <div class="flex flex-col items-start gap-2">
          <div class="bold font-gunplay text-lg">
            {{ item.titel }}
          </div>

          <p class="mb-2 text-gray-400 underline">
            {{ formatDate(item.datum) }}
          </p>

          <p class="mb-4 hyphens-auto break-words" lang="sv">
            {{ item.info ? formattedString(item.info) : "" }}
          </p>

          <Button
            v-show="item['kontakta oss']"
            text="Kontakta oss"
            link="/contact"
            type="button"
            data-wait=""
            styling="outline"
          />
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
  name: "News",

  data() {
    return {
      items: {},
      itemsLoaded: false,
      errorMessage: "",
      showErrorMessage: false,
    };
  },

  async created() {
    this.getCmsData(`${import.meta.env.VITE_BASEROW_NYHETER}`);
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

    formattedString(string) {
      const regexReplace1 = string.replace(/\n/g, "");
      return regexReplace1.replace(/\r/g, "\n");
    },

    formatDate(date) {
      if (!date) return;

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
