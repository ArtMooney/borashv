<script setup>
import Header from "../components/Header.vue";
import News from "../components/News.vue";
import headerImage from "/images/pexels-henkephotoart-29662829.jpg";
</script>

<template>
  <Header
    :image="headerImage"
    title="Borås Hemvärnsförening"
    button-text-one="Bokningar"
    button-link-one="/bokningar"
  />
  <News class="mx-auto w-full max-w-screen-xl" />
</template>

<script>
export default {
  name: "Home",

  head: {
    title: "Borås Hemvärnsförening | Hemvärnsgården | Nyheter & Aktuellt",
    meta: [
      {
        name: "keywords",
        content:
          "borås hemvärnsförening, hemvärnsgården borås, frivilligt försvar borås, försvarsförening borås, hemvärnet borås nyheter, militär föreningsverksamhet borås, hemvärnsgården bokning",
      },
      { name: "robots", content: "index, follow" },
      {
        name: "description",
        content:
          "Välkommen till Borås Hemvärnsförening! Här hittar du senaste nytt, information om vår historiska Hemvärnsgård, bokningar och föreningsverksamhet. En aktiv mötesplats för frivilligt försvar sedan 1953.",
      },
      {
        property: "og:title",
        content: "Borås Hemvärnsförening - Nyheter & Verksamhet",
      },
      {
        property: "og:description",
        content:
          "Följ senaste nyheterna från Borås Hemvärnsförening. Lokalbokningar, evenemang och aktiviteter i vår anrika Hemvärnsgård mellan ishallen och Borås Arena.",
      },
      {
        property: "og:image",
        content: headerImage,
      },
    ],
  },
};
</script>
