<script setup>
import Header from "../components/Header.vue";
import Member from "../components/Member.vue";
import TextBlock from "../components/TextBlock.vue";
import headerImage from "/images/pexels-grizzlybear-421759.jpg";
</script>

<template>
  <Header :image="headerImage" />
  <TextBlock
    title="Bli Medlem"
    :text="textMedlemskap"
    class="mx-auto w-full max-w-screen-xl"
  />
  <Member class="mx-auto w-full max-w-screen-xl" />
</template>

<script>
export default {
  name: "BliMedlem",

  data() {
    return {
      textMedlemskap: `
        Att vara medlem kostar endast 50:-/år

        Föreningen är en nödvändighet för Hemvärnet i Borås. Detta gäller särskilt förvaltandet av Hemvärnsgården och hållandet av en kassa
        (ett Hemvärnsförband får inte ha en egen kassa).

        <strong>Vi behöver dig som medlem!
        Bli medlem NU genom att sätta in 50kr på bg:

        5701-4920</strong>

        OBS! glöm inte att ange ditt namn och adress vid inbetalning.
        `,
    };
  },

  head: {
    title: "Bli Medlem i Hemvärnets Förening Borås | Medlemskap",
    meta: [
      {
        name: "keywords",
        content:
          "Hemvärnet Borås, medlemskap hemvärnet, hemvärnsförening, hemvärnsgården borås, försvarsförening borås, hemvärnsmedlem",
      },
      { name: "robots", content: "index, follow" },
      {
        name: "description",
        content:
          "Bli medlem i Hemvärnets förening i Borås för endast 50kr/år. Som medlem stödjer du förvaltningen av Hemvärnsgården och föreningens viktiga arbete. Anslut dig till vår gemenskap idag!",
      },
      {
        property: "og:title",
        content: "Bli Medlem i Hemvärnets Förening Borås",
      },
      {
        property: "og:description",
        content:
          "Stöd Hemvärnet i Borås genom medlemskap för endast 50kr/år. Din medlemsavgift bidrar till förvaltning av Hemvärnsgården och föreningens verksamhet.",
      },
      {
        property: "og:image",
        content: headerImage,
      },
    ],
  },
};
</script>
