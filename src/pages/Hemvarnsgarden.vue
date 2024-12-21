<script setup>
import Animations from "../components/Animations.vue";
import Header from "../components/Header.vue";
import headerImage from "../assets/skog.jpg";
</script>

<template>
  <Header
    :image="headerImage"
    title="Borås Hemvärnsförening"
    button-text="Bokningar"
  />

  <div
    class="grid-rows-auto mx-auto grid w-full max-w-screen-2xl grid-cols-1 px-4 sm:px-4"
  >
    <Animations />
  </div>
</template>

<script>
export default {
  name: "Hemvarnsgarden",

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
