<template>
  <div class="px-4 py-16 md:px-8">
    <h4 class="mb-8 text-3xl uppercase">Nyheter</h4>

    <div class="grid grid-cols-1 gap-2">
      <div
        v-for="item of items"
        class="mb-4 border border-white/15 bg-[#32382d] p-4"
      >
        <div
          class="flex flex-col items-center gap-6 text-xs sm:flex-row sm:text-sm"
        >
          <NuxtImg
            v-if="item?.bild"
            :src="`cms-files/${item?.bild}` ?? ''"
            alt="Bild på nyhet i flöde"
            class="h-auto w-52 max-w-52 min-w-52"
            sizes="300px sm:400px"
            densities="x1"
            format="webp"
          />

          <div class="flex flex-col items-start gap-2">
            <div class="bold font-heading text-lg">
              {{ item.title }}
            </div>

            <p class="mb-2 text-xs underline opacity-35">
              {{ formatDate(item.datum) }}
            </p>

            <p
              class="mb-4 break-words hyphens-auto"
              lang="sv"
              v-html="formattedText(item?.info)"
            ></p>

            <!--          <p class="mb-4 break-words hyphens-auto" lang="sv">Läs mer</p>-->

            <NuxtLink v-if="item['kontakta oss']" to="/kontakta-oss">
              <button class="primary">Kontakta oss</button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "News",

  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    formattedText(text) {
      return text.replace(/\n/g, "<br>");
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
