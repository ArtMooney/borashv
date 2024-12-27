<script setup>
import StyrelsenList from "../components/StyrelsenList.vue";
</script>

<template>
  <StyrelsenList />
</template>

<script>
export default {
  name: "Styrelsen",

  head: {
    title: "Om Borås Hemvärnsförening | Verksamhet & Historia sedan 2007",
    meta: [
      {
        name: "keywords",
        content:
          "borås hemvärnsförening, borås hemvärnskompani, hemvärnet borås historia, föreningsverksamhet hemvärnet, militär föreningsverksamhet borås, hemvärnsgården verksamhet, luciafirande hemvärnet",
      },
      { name: "robots", content: "index, follow" },
      {
        name: "description",
        content:
          "Borås Hemvärnsförening stödjer hemvärnsverksamheten i Borås stad sedan 2007. Vi förvaltar Hemvärnsgården, arrangerar evenemang och stödjer militär föreningsverksamhet. Medlemskap endast 50kr/år!",
      },
      {
        property: "og:title",
        content: "Om Borås Hemvärnsförening - Stödjande verksamhet sedan 2007",
      },
      {
        property: "og:description",
        content:
          "Upptäck hur Borås Hemvärnsförening stödjer Hemvärnet genom förvaltning av Hemvärnsgården, ekonomiskt stöd till aktiviteter och traditionellt luciafirande. Bli medlem för endast 50kr/år!",
      },
      {
        property: "og:image",
        content: headerImage,
      },
    ],
  },
};
</script>
