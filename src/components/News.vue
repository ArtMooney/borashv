<template>
  <div class="content-frame">
    <div class="content aktiviteter">
      <h4>Nyheter</h4>
      <div class="collection-wrapper">
        <div v-show="showLoader" class="list-loader-wrapper">
          <div
            class="list-loader"
            data-animation-type="lottie"
            data-src="documents/98288-loading.json"
            data-loop="1"
            data-direction="1"
            data-autoplay="1"
            data-is-ix2-target="0"
            data-renderer="svg"
            data-duration="0"
          ></div>
        </div>
        <div
          v-bind:style="{ display: itemsLoaded }"
          v-for="(item, index) of items"
          class="dynamic-item aktivitet"
        >
          <div class="dynamic-item-wrapper aktivitet">
            <div
              v-if="item.bild &amp;&amp; item.bild[0]"
              class="image-wrapper aktivitet"
            >
              <div class="w-embed">
                <img
                  :src="item.bild[0].thumbnails.card_cover.url"
                  class="image blog"
                />
              </div>
            </div>
            <div class="text-center-4">
              <div class="rubrik">{{ item.titel }}</div>
              <p class="text-s text-spanish-grey underline">
                {{ formatDate(item.datum) }}
              </p>
              <div class="spacer-s"></div>
              <p class="text-s line-break">
                {{ item.info ? formattedString(item.info) : &quot;&quot; }}
              </p>
              <div class="spacer-s"></div>
              <a
                v-show="item['kontakta oss']"
                href="kontakta-oss.html"
                class="button darkmode w-button"
                >Kontakta oss</a
              >
            </div>
          </div>
        </div>
        <div v-bind:style="{ display: showErrorMessage }" class="text-block">
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "News",

  data() {
    return {
      items: {},
      itemsLoaded: "none",
      showLoader: true,
      errorMessage: "",
      showErrorMessage: "none",
      baserowClientToken: "ut84FNQWZzasN9CHp3Wgg9DX9ymhZcje",
    };
  },

  async created() {
    this.getCmsData("218351");
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
            this.itemsLoaded = "block";
            this.showLoader = false;
          } else {
            this.itemsLoaded = "none";
            this.showLoader = false;
            this.errorMessage = "Det finns inga aktiviteter för tillfället.";
            this.showErrorMessage = "block";
          }
        })
        .catch((error) => {
          console.log(error);
          this.itemsLoaded = "none";
          this.showLoader = false;
          this.errorMessage = "Något gick fel när aktiviteterna skulle hämtas.";
          this.showErrorMessage = "block";
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
      let formattedDate = `${day} ${month} ${year}`;
      return formattedDate;
    },
  },
};
</script>
