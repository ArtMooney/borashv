<script setup>
import DocumentList from "../components/DocumentList.vue";
import logoImage from "../../public/assets/borashv-logo-1000px.png";
</script>

<template>
  <DocumentList class="mx-auto w-full max-w-screen-xl" />
</template>

<script>
export default {
  name: "Dokument",

  head: {
    title: "Dokument & Protokoll | Hemvärnet Borås | Stadgar och Handlingar",
    meta: [
      {
        name: "keywords",
        content:
          "hemvärnet borås dokument, hemvärnsprotokoll, hemvärnets stadgar, föreningshandlingar borås, hemvärnsförening protokoll, borås hemvärn handlingar",
      },
      { name: "robots", content: "index, follow" },
      {
        name: "description",
        content:
          "Ladda ner officiella dokument, protokoll och stadgar för Hemvärnet i Borås. Här hittar du aktuella föreningshandlingar och styrelsedokument.",
      },
      {
        property: "og:title",
        content: "Dokument & Handlingar - Hemvärnet Borås",
      },
      {
        property: "og:description",
        content:
          "Här finns alla officiella dokument för Hemvärnet i Borås samlade. Ladda ner protokoll, stadgar och andra viktiga föreningshandlingar.",
      },
      {
        property: "og:image",
        content: logoImage,
      },
    ],
  },
};
</script>
