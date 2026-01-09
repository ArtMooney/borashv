<script setup>
useSeoMeta({
  title: "Om Borås Hemvärnsförening | Verksamhet & Historia sedan 2007",
  description:
    "Borås Hemvärnsförening stödjer hemvärnsverksamheten i Borås stad sedan 2007. Vi förvaltar Hemvärnsgården, arrangerar evenemang och stödjer militär föreningsverksamhet. Medlemskap endast 50kr/år!",
  ogTitle: "Om Borås Hemvärnsförening - Stödjande verksamhet sedan 2007",
  ogDescription:
    "Upptäck hur Borås Hemvärnsförening stödjer Hemvärnet genom förvaltning av Hemvärnsgården, ekonomiskt stöd till aktiviteter och traditionellt luciafirande. Bli medlem för endast 50kr/år!",
  ogImage: "https://borashv.se/og-image.webp",
  ogUrl: "https://borashv.se/om-oss",
  ogType: "website",
  ogSiteName: "Borås Hemvärnsförening",
  ogLocale: "sv_SE",
  twitterCard: "summary_large_image",
  twitterTitle: "Om Borås Hemvärnsförening - Stödjande verksamhet sedan 2007",
  twitterDescription:
    "Upptäck hur Borås Hemvärnsförening stödjer Hemvärnet genom förvaltning av Hemvärnsgården, ekonomiskt stöd till aktiviteter och traditionellt luciafirande.",
  twitterImage: "https://borashv.se/og-image.webp",
  keywords:
    "borås hemvärnsförening, borås hemvärnskompani, hemvärnet borås historia, föreningsverksamhet hemvärnet, militär föreningsverksamhet borås, hemvärnsgården verksamhet, luciafirande hemvärnet",
  robots: "index, follow",
  author: "Borås Hemvärnsförening",
  language: "sv-SE",
});

definePageMeta({
  ssr: true,
});
</script>

<template>
  <Header :contain-image="true">
    <template #heading-content>
      <NuxtImg
        src="hemvarnsgarden.jpg"
        alt="Header image"
        class="h-full w-full"
        sizes="320px md:1024px"
        width="1024"
        height="768"
        densities="x1"
        format="webp"
      />
    </template>
  </Header>

  <TextBlock
    :title="staticContent?.textBlock?.title"
    :text="staticContent?.textBlock?.text"
    :button-text="staticContent?.textBlock?.buttonText"
    button-link="/bli-medlem"
    class="mx-auto w-full max-w-7xl"
  />
</template>

<script>
import { useStaticContentStore } from "~/stores/static-content.js";

export default {
  name: "OmOss",

  computed: {
    staticContent() {
      return useStaticContentStore().getContentByTitle("page - Om Oss").content;
    },
  },
};
</script>
