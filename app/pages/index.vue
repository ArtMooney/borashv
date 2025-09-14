<script setup>
useSeoMeta({
  title: "Borås Hemvärnsförening | Hemvärnsgården | Nyheter & Aktuellt",
  description:
    "Välkommen till Borås Hemvärnsförening! Här hittar du senaste nytt, information om vår historiska Hemvärnsgård, bokningar och föreningsverksamhet. En aktiv mötesplats för frivilligt försvar sedan 1953.",
  ogTitle: "Borås Hemvärnsförening - Nyheter & Verksamhet",
  ogDescription:
    "Följ senaste nyheterna från Borås Hemvärnsförening. Lokalbokningar, evenemang och aktiviteter i vår anrika Hemvärnsgård mellan ishallen och Borås Arena.",
  ogImage: "",
  ogUrl: "https://borashv.se/",
  ogType: "website",
  ogSiteName: "Borås Hemvärnsförening",
  ogLocale: "sv_SE",
  twitterCard: "summary_large_image",
  twitterTitle: "Borås Hemvärnsförening - Nyheter & Verksamhet",
  twitterDescription:
    "Följ senaste nyheterna från Borås Hemvärnsförening. Lokalbokningar, evenemang och aktiviteter i vår anrika Hemvärnsgård.",
  twitterImage: "",
  keywords:
    "borås hemvärnsförening, hemvärnsgården borås, frivilligt försvar borås, försvarsförening borås, hemvärnet borås nyheter, militär föreningsverksamhet borås, hemvärnsgården bokning",
  robots: "index, follow",
  author: "Borås Hemvärnsförening",
  language: "sv-SE",
});

definePageMeta({
  ssr: true,
});

const config = useRuntimeConfig();

const { data: items, error } = await useFetch("/api/nyheter", {
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
    title="Borås Hemvärnsförening"
    button-text-one="Bokningar"
    button-link-one="/bokningar"
  >
    <template #heading-content>
      <NuxtImg
        src="deep-forest-with-backlight.jpg"
        alt="Header image"
        class="parallax-background-hero h-full min-h-[23rem] w-full object-cover lg:min-h-[43rem]"
        sizes="1000px md:2000px"
        width="3888"
        height="2592"
        densities="x1"
        format="webp"
      />
    </template>
  </Header>

  <LoadingSpinner v-if="!items?.length && !error" />

  <News
    v-if="items?.length"
    class="mx-auto w-full max-w-screen-xl"
    :items="items"
  />

  <div
    v-if="error"
    class="mx-auto my-16 w-full max-w-screen-xl bg-[#a38373] p-4 px-8 text-black"
  >
    {{ decodeURIComponent(error?.statusMessage || "Error") }}
  </div>
</template>

<script>
export default {
  name: "Index",
};
</script>
