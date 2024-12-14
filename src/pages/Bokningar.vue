<script setup>
import Header from "../components/Header.vue";
import TextBlock from "../components/TextBlock.vue";
import headerImage from "../assets/sean-foster-PMmb0MEE7Co-unsplash-2.jpg";
</script>

<template>
  <Header :image="headerImage" />
  <TextBlock
    title="Bokningar"
    text="All verksamhet i hemvärnsgården skall förbokas, även regelbunden
        återkommande verksamhet. Bokning sker via David Wernold. Email:
        boka_hv_garden@mail.com Tel./sms: 0703-356483 Nyckel hämtas/lämnas enl.
        överenskommelse. Bokningsbart: Konferensrum, samlingssal, mäss,
        logementen och projektor/kopiator. Ev. debitering enl. prislista.
        Bokningsregler finns längre ner på denna sida. Bokningsregler finns
        längre ner på denna sida."
  />
</template>

<script>
export default {
  name: "Home",

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
