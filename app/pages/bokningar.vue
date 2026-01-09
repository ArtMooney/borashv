<script setup>
useSeoMeta({
  title: "Boka Lokaler | Hemvärnsgården Borås | Konferens & Samlingssal",
  description:
    "Boka lokaler i Hemvärnsgården Borås - konferensrum, samlingssal, mäss och logement. Fullutrustat med projektor och kök. Enkel bokning via telefon eller e-post.",
  ogTitle: "Lokalbokning Hemvärnsgården Borås - Konferens & Samlingslokaler",
  ogDescription:
    "Hyr våra lokaler i centrala Borås - konferensrum, samlingssal, mäss och logement. Perfekt för möten, evenemang och övernattning. Boka enkelt via vår bokningsansvarige.",
  ogImage: "https://borashv.se/og-image.webp",
  ogUrl: "https://borashv.se/bokningar",
  ogType: "website",
  ogSiteName: "Borås Hemvärnsförening",
  ogLocale: "sv_SE",
  twitterCard: "summary_large_image",
  twitterTitle:
    "Lokalbokning Hemvärnsgården Borås - Konferens & Samlingslokaler",
  twitterDescription:
    "Hyr våra lokaler i centrala Borås - konferensrum, samlingssal, mäss och logement. Perfekt för möten, evenemang och övernattning.",
  twitterImage: "https://borashv.se/og-image.webp",
  keywords:
    "hemvärnsgården borås, lokalbokning borås, konferenslokal borås, samlingssal, mäss bokning, logement borås, militär konferenslokal, möteslokal borås",
  robots: "index, follow",
  author: "Borås Hemvärnsförening",
  language: "sv-SE",
});

definePageMeta({
  ssr: true,
});

const config = useRuntimeConfig();

const { data: items, error } = await useFetch("/api/bokningar", {
  method: "GET",
  headers: {
    Authorization:
      "Basic " + btoa(config.public.userName + ":" + config.public.userPass),
  },
  default: () => [],
});
</script>

<template>
  <Header
    :button-text-one="staticContent?.header?.buttonTextOne"
    button-link-one="/bokningar"
    button-hash-one="bokningskalender"
    :button-text-two="staticContent?.header?.buttonTextTwo"
    button-link-two="/bokningar"
    button-hash-two="bokningsregler"
  >
    <template #heading-content>
      <NuxtImg
        src="old-overgrown-military-equipment.jpg"
        alt="Header image"
        class="parallax-background-hero h-full min-h-92 w-full object-cover lg:min-h-172"
        sizes="320px sm:640px md:768px lg:1024px xl:1280px xxl:1536px"
        width="2000"
        height="3000"
        densities="x1"
        format="webp"
      />
    </template>
  </Header>

  <TextBlock
    :title="staticContent?.text_bokningar?.title"
    :text="staticContent?.text_bokningar?.text"
    class="mx-auto w-full max-w-7xl"
  />

  <div class="mx-auto my-12 w-full max-w-7xl bg-transparent px-4 md:px-8">
    <div class="h-px w-full bg-white/15"></div>
  </div>

  <LoadingSpinner v-if="!items?.length && !error" />

  <BookingsCalendar
    v-if="items?.length"
    class="mx-auto w-full max-w-7xl"
    :items="items"
  />

  <div
    v-if="error"
    class="mx-auto my-16 w-full max-w-7xl bg-[#a38373] p-4 px-8 text-black"
  >
    {{ decodeURIComponent(error?.statusMessage || "Error") }}
  </div>

  <BookingsForm />

  <div class="mx-auto my-12 w-full max-w-7xl bg-transparent px-4 md:px-8">
    <div class="h-px w-full bg-white/15"></div>
  </div>

  <TextBlock
    id="bokningsregler"
    :title="staticContent?.text_regler?.title"
    :text="staticContent?.text_regler?.text"
    class="mx-auto w-full max-w-7xl"
  />
</template>

<script>
import { useStaticContentStore } from "~/stores/static-content.js";

export default {
  name: "Bokningar",

  computed: {
    staticContent() {
      return useStaticContentStore().getContentByTitle("page - Bokningar")
        .content;
    },
  },
};
</script>
