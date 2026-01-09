<script setup>
useSeoMeta({
  title: "Hemvärnsgården Borås | Historia & Nutid | Est. 1953",
  description:
    "Upptäck Hemvärnsgården i Borås, en historisk byggnad från 1899. Från Villa Armbåga till dagens aktiva mötesplats mellan ishallen och Borås Arena. Läs om invigningen 1953 och byggnadens rika historia.",
  ogTitle: "Hemvärnsgården Borås - En historisk mötesplats sedan 1953",
  ogDescription:
    "Belägen mellan ishallen och Borås Arena ligger den historiska Hemvärnsgården med sitt karakteristiska röda torn. En aktiv mötesplats för Lottakåren, FRO och andra föreningar sedan 1953.",
  ogImage: "https://borashv.se/og-image.webp",
  ogUrl: "https://borashv.se/hemvarnsgarden",
  ogType: "website",
  ogSiteName: "Borås Hemvärnsförening",
  ogLocale: "sv_SE",
  twitterCard: "summary_large_image",
  twitterTitle: "Hemvärnsgården Borås - En historisk mötesplats sedan 1953",
  twitterDescription:
    "Belägen mellan ishallen och Borås Arena ligger den historiska Hemvärnsgården med sitt karakteristiska röda torn. En aktiv mötesplats sedan 1953.",
  twitterImage: "https://borashv.se/og-image.webp",
  keywords:
    "hemvärnsgården borås, villa armbåga, borås hemvärn historia, hemvärnets musikkår borås, historisk byggnad borås, militärhistoria borås, frivilligt försvar borås, hemvärnsgården älgårdsvägen",
  robots: "index, follow",
  author: "Borås Hemvärnsförening",
  language: "sv-SE",
});

definePageMeta({
  ssr: true,
});
</script>

<template>
  <Header
    :title="staticContent?.header?.title"
    :button-text-one="staticContent?.header?.buttonTextOne"
    button-link-one="/bokningar"
  >
    <template #heading-content>
      <NuxtImg
        src="skog.jpg"
        alt="Header image"
        class="parallax-background-hero h-full min-h-92 w-full object-cover lg:min-h-172"
        sizes="320px sm:640px md:768px lg:1024px xl:1280px xxl:1536px"
        width="2000"
        height="786"
        densities="x1"
        format="webp"
      />
    </template>
  </Header>

  <SplitContentSection :text="staticContent?.textBlock?.textTodayOne">
    <template #image-content>
      <NuxtImg
        src="hemvarnsgarden.jpg"
        alt="hemvärnsgården"
        class="h-full w-full object-cover"
        sizes="320px sm:640px md:768px lg:1024px"
        width="1024"
        height="768"
        densities="x1"
        format="webp"
      />
    </template>
  </SplitContentSection>

  <SplitContentSection :text="staticContent?.textBlock?.textTodayTwo">
    <template #image-content>
      <NuxtImg
        src="overgrown-car-wreck.jpg"
        alt="överväxt bilvrak i skogen"
        class="h-full w-full object-cover lg:order-last"
        sizes="320px md:640px"
        width="2000"
        height="1333"
        densities="x1"
        format="webp"
      />
    </template>
  </SplitContentSection>

  <SplitContentSection :text="staticContent?.textBlock?.textThenOne">
    <template #image-content>
      <NuxtImg
        src="rusty-gears.jpg"
        alt="rostiga kugghjul med kedjor"
        class="h-full w-full object-cover"
        sizes="320px md:640px"
        width="2000"
        height="1333"
        densities="x1"
        format="webp"
      /> </template
  ></SplitContentSection>

  <SplitContentSection :text="staticContent?.textBlock?.textThenTwo">
    <template #image-content>
      <NuxtImg
        src="jerry-can-with-old-peeling-paint.jpg"
        alt="bensindunk med gammal flagad färg"
        class="h-full w-full object-cover lg:order-last"
        sizes="320px md:640px"
        width="1412"
        height="2000"
        densities="x1"
        format="webp"
      /> </template
  ></SplitContentSection>
</template>

<script>
import { useStaticContentStore } from "~/stores/static-content.js";

export default {
  name: "Hemvarnsgarden",

  computed: {
    staticContent() {
      return useStaticContentStore().getContentByTitle("page - Hemvarnsgarden")
        .content;
    },
  },
};
</script>
