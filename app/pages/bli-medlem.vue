<script setup>
useSeoMeta({
  title: "Bli Medlem i Hemvärnets Förening Borås | Medlemskap",
  description:
    "Bli medlem i Hemvärnets förening i Borås för endast 50kr/år. Som medlem stödjer du förvaltningen av Hemvärnsgården och föreningens viktiga arbete. Anslut dig till vår gemenskap idag!",
  ogTitle: "Bli Medlem i Hemvärnets Förening Borås",
  ogDescription:
    "Stöd Hemvärnet i Borås genom medlemskap för endast 50kr/år. Din medlemsavgift bidrar till förvaltning av Hemvärnsgården och föreningens verksamhet.",
  ogImage: "https://borashv.se/og-image.webp",
  ogUrl: "https://borashv.se/bli-medlem",
  ogType: "website",
  ogSiteName: "Borås Hemvärnsförening",
  ogLocale: "sv_SE",
  twitterCard: "summary_large_image",
  twitterTitle: "Bli Medlem i Hemvärnets Förening Borås",
  twitterDescription:
    "Stöd Hemvärnet i Borås genom medlemskap för endast 50kr/år. Din medlemsavgift bidrar till förvaltning av Hemvärnsgården och föreningens verksamhet.",
  twitterImage: "https://borashv.se/og-image.webp",
  keywords:
    "Hemvärnet Borås, medlemskap hemvärnet, hemvärnsförening, hemvärnsgården borås, försvarsförening borås, hemvärnsmedlem",
  robots: "index, follow",
  author: "Borås Hemvärnsförening",
  language: "sv-SE",
});

definePageMeta({
  ssr: true,
});
</script>

<template>
  <Header>
    <template #heading-content>
      <NuxtImg
        src="closeup-bridge.jpg"
        alt="Header image"
        class="parallax-background-hero h-full min-h-[23rem] w-full object-cover lg:min-h-[43rem]"
        sizes="320px sm:640px md:768px lg:1024px xl:1280px xxl:1536px"
        width="2000"
        height="1330"
        densities="x1"
        format="webp"
      /> </template
  ></Header>

  <TextBlock
    title="Bli Medlem"
    :text="textMedlemskap"
    class="mx-auto w-full max-w-screen-xl"
  />

  <Member />
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
        Medlem blir du genom att betala in medlemsavgiften på 50 kr till Swish 1230930305 eller på Bankgiro på bg: 5701-4920</strong>

        OBS! glöm inte att ange ditt namn och adress vid inbetalning.
        `,
    };
  },
};
</script>
