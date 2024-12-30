<script setup>
import SplitContentSection from "../components/SplitContentSection.vue";
import ContactBlock from "../components/ContactBlock.vue";
import Contact from "../components/Contact.vue";
import imageContact from "/images/militar-telefon.jpg";
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
  <ContactBlock class="mx-auto w-full max-w-screen-xl" />
  <Contact class="mx-auto w-full max-w-screen-xl" />
</template>

<script>
export default {
  name: "Kontakta Oss",

  data() {
    return {
      textKontakt: `
        Vill du bli medlem i föreningen?

        Vill du istället bli medlem i hemvärnet hänvisar vi till:
        <a href="https://mitt.forsvarsmakten.se/homeguard-info" target="_blank">https://mitt.forsvarsmakten.se/homeguard-info</a>

        Boka Hemvärnsgården?

        Veta mer om föreningen? Eller om du har några andra frågor.
      `,
    };
  },

  head: {
    title: "Kontakta Oss | Borås Hemvärnsförening | Medlemskap & Bokningar",
    meta: [
      {
        name: "keywords",
        content:
          "kontakta hemvärnet borås, bli medlem hemvärnet, boka hemvärnsgården borås, hemvärnet kontaktuppgifter, borås hemvärnsförening kontakt, medlemskap hemvärnet",
      },
      { name: "robots", content: "index, follow" },
      {
        name: "description",
        content:
          "Kontakta Borås Hemvärnsförening för medlemskap, lokalbokning eller andra frågor. Information om hur du blir medlem i Hemvärnet eller föreningsverksamheten i Borås.",
      },
      {
        property: "og:title",
        content: "Kontakta Borås Hemvärnsförening - Medlemskap & Information",
      },
      {
        property: "og:description",
        content:
          "Vill du bli medlem, boka Hemvärnsgården eller veta mer om föreningen? Här hittar du all kontaktinformation till Borås Hemvärnsförening.",
      },
      {
        property: "og:image",
        content: imageContact,
      },
    ],
  },
};
</script>
