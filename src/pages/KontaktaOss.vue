<script setup>
import SplitContentSection from "../components/SplitContentSection.vue";
import headerImage from "../assets/pexels-gabby-k-7794400-2.jpg";
import imageContact from "../assets/militar-telefon.jpg";
</script>

<template>
  <SplitContentSection
    text-title="Kontaktuppgifter"
    :text="textKontakt"
    :image="imageContact"
    :swap-sides="true"
    :split-half="true"
    class="mx-auto w-full max-w-screen-xl"
  />
</template>

<script>
export default {
  name: "Kontakta Oss",

  data() {
    return {
      textKontakt: `
        Vill du bli medlem i föreningen?

        Vill du istället bli medlem i hemvärnet hänvisar vi till:
        <a href="https://mitt.forsvarsmakten.se/homeguard-info">https://mitt.forsvarsmakten.se/homeguard-info</a>

        Boka Hemvärnsgården?

        Veta mer om föreningen? Eller om du har några andra frågor.
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
