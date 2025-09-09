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
  ssr: false,
});
</script>

<template>
  <Header
    image="pexels-henkephotoart-29662829.jpg"
    title="Borås Hemvärnsförening"
    button-text-one="Bokningar"
    button-link-one="/bokningar"
  />

  <News class="mx-auto w-full max-w-screen-xl" />
</template>

<script>
export default {
  name: "Index",
};
</script>
