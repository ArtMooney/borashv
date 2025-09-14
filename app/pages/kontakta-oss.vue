<script setup>
useSeoMeta({
  title: "Kontakta Oss | Borås Hemvärnsförening | Medlemskap & Bokningar",
  description:
    "Kontakta Borås Hemvärnsförening för medlemskap, lokalbokning eller andra frågor. Information om hur du blir medlem i Hemvärnet eller föreningsverksamheten i Borås.",
  ogTitle: "Kontakta Borås Hemvärnsförening - Medlemskap & Information",
  ogDescription:
    "Vill du bli medlem, boka Hemvärnsgården eller veta mer om föreningen? Här hittar du all kontaktinformation till Borås Hemvärnsförening.",
  ogImage:
    "https://borashv.se/_ipx/f_webp&q_80&s_2000x1500/militar-telefon.jpg",
  ogUrl: "https://borashv.se/kontakta-oss",
  ogType: "website",
  ogSiteName: "Borås Hemvärnsförening",
  ogLocale: "sv_SE",
  twitterCard: "summary_large_image",
  twitterTitle: "Kontakta Borås Hemvärnsförening - Medlemskap & Information",
  twitterDescription:
    "Vill du bli medlem, boka Hemvärnsgården eller veta mer om föreningen? Här hittar du all kontaktinformation till Borås Hemvärnsförening.",
  twitterImage:
    "https://borashv.se/_ipx/f_webp&q_80&s_2000x1500/militar-telefon.jpg",
  keywords:
    "kontakta hemvärnet borås, bli medlem hemvärnet, boka hemvärnsgården borås, hemvärnet kontaktuppgifter, borås hemvärnsförening kontakt, medlemskap hemvärnet",
  robots: "index, follow",
  author: "Borås Hemvärnsförening",
  language: "sv-SE",
});

definePageMeta({
  ssr: true,
});
</script>

<template>
  <SplitContentSection
    text-title="Kontaktuppgifter"
    :text="textKontakt"
    :split-half="true"
  >
    <template #image-content>
      <NuxtImg
        src="militar-telefon.jpg"
        alt="gammal militär telefon"
        class="h-full w-full object-cover lg:order-last"
        sizes="1000px md:2000px"
        width="2000"
        height="1500"
        densities="x1"
        format="webp"
      />
    </template>
  </SplitContentSection>

  <ContactBlock />

  <Contact />
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
};
</script>
