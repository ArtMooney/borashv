<script setup>
import Header from "../components/Header.vue";
import TextBlock from "../components/TextBlock.vue";
import headerImage from "../../public/images/Hemvarnsgarden-1024x768.jpg";
</script>

<template>
  <Header :image="headerImage" :contain-image="true" />
  <TextBlock
    title="Om Föreningen"
    :text="textForening"
    button-text="Bli medlem"
    button-link="/bli-medlem"
    class="mx-auto w-full max-w-screen-xl"
  />
</template>

<script>
export default {
  name: "OmOss",

  data() {
    return {
      textForening: `
      Borås Hemvärnsförening är sedan den 20:e februari 2007 namnet på Borås Hemvärnskompanis föreningsverksamhet. Ett utdrag från föreningen stadgar: Föreningen har till uppgift att ekonomiskt och lokalmässigt samt på andra lämpliga sätt stödja hemvärnsverksamheten eller av föreningen bedömd likvärdig verksamhet inom Borås Stad.

      Detta innebär bland annat att föreningen administrerar och ansvarar för drift och underhåll av Hemvärnsgården m.m. Det är därför viktigt att Du som hemvärnssoldat också är medlem i föreningen, årsavgift endast 50 kr!

      Föreningen stödjer även Hemvärnet ekonomiskt.Detta kan t.ex. vara stöd till det mångåriga deltagandet i tävlingen Sommertræf på Fyn I Danmark. Är det så att ett kompani, pluton eller motsvarande vill genomföra någon trivselaktivitet så kan även då föreningen bidra ekonomiskt. Föreningen anordnar även fester som brukar vara mycket uppskattade.

      Föreningen genomför också i samverkan med Borås Hvkomp ett årlig luciafirande som är en tradition som förmodligen är lika gammal som Hemvärnet i Borås.

      Föreningen är en nödvändighet för Hemvärnet i Borås. Detta gäller särskilt förvaltandet av Hemvärnsgården och hållandet av en kassa(ett Hemvärnsförband får inte ha en egen kassa).

      Vi behöver dig som medlem !
      Bli medlem NU genom att sätta in 50kr på bg 5701-4920
      OBS ! glöm inte att ange ditt namn och adress vid inbetalning
      `,
    };
  },

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
