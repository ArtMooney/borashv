<script setup>
import Header from "../components/Header.vue";
import Member from "../components/Member.vue";
import TextBlock from "../components/TextBlock.vue";
import headerImage from "../assets/pexels-grizzlybear-421759-2.jpg";
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
