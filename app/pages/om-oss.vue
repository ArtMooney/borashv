<script setup>
useSeoMeta({
  title: "Om Borås Hemvärnsförening | Verksamhet & Historia sedan 2007",
  description:
    "Borås Hemvärnsförening stödjer hemvärnsverksamheten i Borås stad sedan 2007. Vi förvaltar Hemvärnsgården, arrangerar evenemang och stödjer militär föreningsverksamhet. Medlemskap endast 50kr/år!",
  ogTitle: "Om Borås Hemvärnsförening - Stödjande verksamhet sedan 2007",
  ogDescription:
    "Upptäck hur Borås Hemvärnsförening stödjer Hemvärnet genom förvaltning av Hemvärnsgården, ekonomiskt stöd till aktiviteter och traditionellt luciafirande. Bli medlem för endast 50kr/år!",
  ogImage: "https://borashv.se/og-image.webp",
  ogUrl: "https://borashv.se/om-oss",
  ogType: "website",
  ogSiteName: "Borås Hemvärnsförening",
  ogLocale: "sv_SE",
  twitterCard: "summary_large_image",
  twitterTitle: "Om Borås Hemvärnsförening - Stödjande verksamhet sedan 2007",
  twitterDescription:
    "Upptäck hur Borås Hemvärnsförening stödjer Hemvärnet genom förvaltning av Hemvärnsgården, ekonomiskt stöd till aktiviteter och traditionellt luciafirande.",
  twitterImage: "https://borashv.se/og-image.webp",
  keywords:
    "borås hemvärnsförening, borås hemvärnskompani, hemvärnet borås historia, föreningsverksamhet hemvärnet, militär föreningsverksamhet borås, hemvärnsgården verksamhet, luciafirande hemvärnet",
  robots: "index, follow",
  author: "Borås Hemvärnsförening",
  language: "sv-SE",
});

definePageMeta({
  ssr: true,
});
</script>

<template>
  <Header :contain-image="true">
    <template #heading-content>
      <NuxtImg
        src="hemvarnsgarden.jpg"
        alt="Header image"
        class="h-full w-full"
        sizes="1000px md:2000px"
        width="1024"
        height="768"
        densities="x1"
        format="webp"
      />
    </template>
  </Header>

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
};
</script>
