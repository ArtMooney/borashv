<template>
  <div class="px-4 py-16 md:px-8">
    <h4 class="mb-8 text-3xl uppercase">
      {{ staticContent?.headings?.title }}
    </h4>

    <div class="grid grid-cols-1 gap-2">
      <div
        v-for="item of items"
        class="mb-4 border border-white/15 bg-[#32382d] p-4"
      >
        <div
          class="flex flex-col gap-6 overflow-hidden text-xs sm:flex-row sm:text-sm"
        >
          <div
            class="relative h-52 w-full overflow-hidden sm:h-auto sm:w-52 sm:max-w-52 sm:min-w-52"
          >
            <NuxtImg
              v-if="item?.bild"
              :src="`cms-files/${item?.bild}` ?? ''"
              alt="Bakgrund till bild på nyhet i flöde"
              class="absolute inset-0 h-full w-full object-cover opacity-25 blur-lg"
              sizes="300px sm:400px"
              densities="x1"
              format="webp"
            />

            <NuxtImg
              v-if="item?.bild"
              :src="`cms-files/${item?.bild}` ?? ''"
              alt="Bild på nyhet i flöde"
              class="relative h-full w-full object-contain"
              sizes="300px sm:400px"
              densities="x1"
              format="webp"
            />
          </div>

          <div class="flex flex-col items-start gap-2">
            <div class="bold font-heading text-lg">
              {{ item?.title }}
            </div>

            <p class="mb-2 text-xs underline opacity-35">
              {{ formatDate(item?.datum) }}
            </p>

            <p
              class="mb-4 overflow-hidden break-all hyphens-auto"
              lang="sv"
              v-html="formattedText(item?.info)"
            ></p>
          </div>

          <NuxtLink v-if="item['kontakta oss']" to="/kontakta-oss">
            <button class="primary">Kontakta oss</button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStaticContentStore } from "~/stores/static-content.js";

export default {
  name: "News",

  props: {
    items: {
      type: Array,
      default: () => [],
    },
    newsContent: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    months() {
      return months;
    },

    staticContent() {
      return useStaticContentStore().getContentByTitle("component - News")
        .content;
    },
  },

  methods: {
    formattedText(text) {
      if (!text) return "";

      return text.replace(/\n/g, "<br>");
    },

    formatDate(date) {
      if (!date) return;

      let dateObj = new Date(date);
      let day = dateObj.getDate();
      let month = this.months[dateObj.getMonth()];
      let year = dateObj.getFullYear();

      return `${day} ${month} ${year}`;
    },
  },
};
</script>
