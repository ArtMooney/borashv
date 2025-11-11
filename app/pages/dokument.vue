<script setup>
useSeoMeta({
  title: "Dokument & Protokoll | Hemvärnet Borås | Stadgar och Handlingar",
  description:
    "Ladda ner officiella dokument, protokoll och stadgar för Hemvärnet i Borås. Här hittar du aktuella föreningshandlingar och styrelsedokument.",
  ogTitle: "Dokument & Handlingar - Hemvärnet Borås",
  ogDescription:
    "Här finns alla officiella dokument för Hemvärnet i Borås samlade. Ladda ner protokoll, stadgar och andra viktiga föreningshandlingar.",
  ogImage: "https://borashv.se/og-image.webp",
  ogUrl: "https://borashv.se/dokument",
  ogType: "website",
  ogSiteName: "Borås Hemvärnsförening",
  ogLocale: "sv_SE",
  twitterCard: "summary_large_image",
  twitterTitle: "Dokument & Handlingar - Hemvärnet Borås",
  twitterDescription:
    "Här finns alla officiella dokument för Hemvärnet i Borås samlade. Ladda ner protokoll, stadgar och andra viktiga föreningshandlingar.",
  twitterImage: "https://borashv.se/og-image.webp",
  keywords:
    "hemvärnet borås dokument, hemvärnsprotokoll, hemvärnets stadgar, föreningshandlingar borås, hemvärnsförening protokoll, borås hemvärn handlingar",
  robots: "index, follow",
  author: "Borås Hemvärnsförening",
  language: "sv-SE",
});

definePageMeta({
  ssr: true,
});

const config = useRuntimeConfig();

const { data: items, error } = await useFetch("/api/dokument", {
  method: "GET",
  headers: {
    Authorization:
      "Basic " + btoa(config.public.userName + ":" + config.public.userPass),
  },
  default: () => [],
});
</script>

<template>
  <div
    class="mx-auto grid w-full max-w-screen-xl grid-cols-1 gap-2 px-4 py-12 md:px-8"
  >
    <h4 class="text-3xl uppercase">Dokument</h4>

    <p class="pb-12">Här kan du ladda ner våra protokoll och stadgar</p>

    <LoadingSpinner
      v-if="!items?.length && !error"
      class="col-start-1 col-end-1 lg:col-start-2 lg:col-end-8"
    />

    <a
      v-if="items?.length"
      v-for="item of items"
      :href="item?.['file|doc']?.[0]?.url ?? ''"
      target="_blank"
      class="flex cursor-pointer flex-row items-center justify-between border border-white/15 bg-gradient-to-r from-[#32382d] to-[#353238] p-4 transition-colors duration-300 ease-in-out hover:from-[#343a2e] hover:to-[#37343a] hover:shadow-[0_0_20px_rgba(185,177,99,0.35)]"
    >
      <div
        class="bold font-heading pr-4 text-xl break-words hyphens-auto lg:text-2xl"
        lang="sv"
      >
        {{ item.name }}
      </div>

      <div class="flex-shrink-0 border-l-2 border-white/15 pl-4">
        <NuxtImg
          v-if="item?.thumbnail?.[0]?.url"
          :src="item.thumbnail[0].url"
          :alt="item?.['file|doc']?.[0]?.url ?? ''"
          class="h-32 w-auto"
          sizes="300px sm:400px"
        />
      </div>
    </a>

    <div
      v-if="error"
      class="relative mx-auto my-16 w-full max-w-screen-xl bg-[#a38373] p-4 px-8 text-black"
    >
      {{ decodeURIComponent(error?.statusMessage || "Error") }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Dokument",
};
</script>
