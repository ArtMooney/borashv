<script setup>
import Header from "../components/Header.vue";
import TextBlock from "../components/TextBlock.vue";
import headerImage from "../assets/Hemvarnsgarden-1024x768.jpg";
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
    title:
      "Webb- och 3D-Animationstjänster | Kreativa Lösningar | FrameCore 2024",
    meta: [
      {
        name: "keywords",
        content:
          "webb- och 3D-animation, kreativa lösningar, visualiseringar, reklamfilmer, webbutveckling, hemsidor, FrameCore 2024",
      },
      { name: "robots", content: "index, follow" },
      {
        name: "description",
        content:
          "Utforska skräddarsydda webbsidor och 3D-animationslösningar för ditt företag. Kontakta oss för en kostnadsfri konsultation idag!",
      },
      {
        property: "og:title",
        content:
          "Webb- och 3D-Animationstjänster | Kreativa Lösningar | FrameCore 2024",
      },
      {
        property: "og:description",
        content:
          "Utforska skräddarsydda webb- och 3D-animationslösningar för ditt företag. Kontakta oss för en kostnadsfri konsultation idag!",
      },
      {
        property: "og:image",
        content: "https://framecore.se/assets/Hand_new_utkast06-ChzJefJk.jpg",
      },
    ],
  },
};
</script>
