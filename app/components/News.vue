<template>
  <div class="grid grid-cols-1 gap-2 px-4 py-16 md:px-8">
    <h4 class="text-3xl uppercase">Nyheter</h4>

    <div
      v-for="item of items"
      class="mb-4 border border-white/15 bg-[#32382d] p-4"
    >
      <div class="flex flex-col gap-4 text-xs sm:flex-row sm:text-sm">
        <div class="w-full sm:min-h-36 sm:w-36 sm:min-w-36">
          <NuxtImg
            v-if="item?.bild"
            :src="`cms-images/${item?.bild}` ?? ''"
            alt=""
            class="h-full w-full object-cover"
            sizes="300px sm:400px"
            densities="x1"
            format="webp"
          />
        </div>

        <div class="flex flex-col items-start gap-2">
          <div class="bold font-heading text-lg">
            {{ item.title }}
          </div>

          <p class="mb-2 text-gray-400 underline">
            {{ formatDate(item.datum) }}
          </p>

          <p
            class="mb-4 break-words hyphens-auto"
            lang="sv"
            v-html="item.info ? formattedString(item.info) : ''"
          ></p>

          <NuxtLink v-if="item['kontakta oss']" to="/kontakta-oss">
            <button class="primary">Kontakta oss</button>
          </NuxtLink>
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
    formattedString(string) {
      const regexReplace1 = string.replace(/\n/g, "");
      const withLineBreaks = regexReplace1.replace(/\r/g, "\n");

      return withLineBreaks.replace(
        /(https?:\/\/[^\s]+)/g,
        '<span class="[word-break:break-all]">$1</span>',
      );
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
