<script setup>
useSeoMeta({
  title: "Hemvärnsgården Borås | Historia & Nutid | Est. 1953",
  description:
    "Upptäck Hemvärnsgården i Borås, en historisk byggnad från 1899. Från Villa Armbåga till dagens aktiva mötesplats mellan ishallen och Borås Arena. Läs om invigningen 1953 och byggnadens rika historia.",
  ogTitle: "Hemvärnsgården Borås - En historisk mötesplats sedan 1953",
  ogDescription:
    "Belägen mellan ishallen och Borås Arena ligger den historiska Hemvärnsgården med sitt karakteristiska röda torn. En aktiv mötesplats för Lottakåren, FRO och andra föreningar sedan 1953.",
  ogImage: "https://borashv.se/og-image.webp",
  ogUrl: "https://borashv.se/hemvarnsgarden",
  ogType: "website",
  ogSiteName: "Borås Hemvärnsförening",
  ogLocale: "sv_SE",
  twitterCard: "summary_large_image",
  twitterTitle: "Hemvärnsgården Borås - En historisk mötesplats sedan 1953",
  twitterDescription:
    "Belägen mellan ishallen och Borås Arena ligger den historiska Hemvärnsgården med sitt karakteristiska röda torn. En aktiv mötesplats sedan 1953.",
  twitterImage: "https://borashv.se/og-image.webp",
  keywords:
    "hemvärnsgården borås, villa armbåga, borås hemvärn historia, hemvärnets musikkår borås, historisk byggnad borås, militärhistoria borås, frivilligt försvar borås, hemvärnsgården älgårdsvägen",
  robots: "index, follow",
  author: "Borås Hemvärnsförening",
  language: "sv-SE",
});

definePageMeta({
  ssr: true,
});
</script>

<template>
  <Header title="Borås Hemvärnsgård" button-text="Bokningar">
    <template #heading-content>
      <NuxtImg
        src="skog.jpg"
        alt="Header image"
        class="parallax-background-hero h-full min-h-92 w-full object-cover lg:min-h-172"
        sizes="320px sm:640px md:768px lg:1024px xl:1280px xxl:1536px"
        width="2000"
        height="786"
        densities="x1"
        format="webp"
      />
    </template>
  </Header>

  <SplitContentSection :text="textToday1">
    <template #image-content>
      <NuxtImg
        src="hemvarnsgarden.jpg"
        alt="hemvärnsgården"
        class="h-full w-full object-cover"
        sizes="320px sm:640px md:768px lg:1024px"
        width="1024"
        height="768"
        densities="x1"
        format="webp"
      />
    </template>
  </SplitContentSection>

  <SplitContentSection :text="textToday2">
    <template #image-content>
      <NuxtImg
        src="overgrown-car-wreck.jpg"
        alt="överväxt bilvrak i skogen"
        class="h-full w-full object-cover lg:order-last"
        sizes="320px md:640px"
        width="2000"
        height="1333"
        densities="x1"
        format="webp"
      />
    </template>
  </SplitContentSection>

  <SplitContentSection :text="textThen1">
    <template #image-content>
      <NuxtImg
        src="rusty-gears.jpg"
        alt="rostiga kugghjul med kedjor"
        class="h-full w-full object-cover"
        sizes="320px md:640px"
        width="2000"
        height="1333"
        densities="x1"
        format="webp"
      /> </template
  ></SplitContentSection>

  <SplitContentSection :text="textThen2">
    <template #image-content>
      <NuxtImg
        src="jerry-can-with-old-peeling-paint.jpg"
        alt="bensindunk med gammal flagad färg"
        class="h-full w-full object-cover lg:order-last"
        sizes="320px md:640px"
        width="1412"
        height="2000"
        densities="x1"
        format="webp"
      /> </template
  ></SplitContentSection>
</template>

<script>
export default {
  name: "Hemvarnsgarden",

  data() {
    return {
      textToday1: `
        <strong>Idag</strong>
        Mellan ishallen och Borås Arena ligger idag Hemvärnsgården med sin speciella arkitektur och röda torn. Lokalen används idag till olika typer av verksamhet. Lottakåren, FRO (frivilliga radioorganisationen) är några föreningar som brukar använda lokalen. Den kan även bokas av privatpersoner för olika typer av kamrat och släktträffar. Den består av sammanträdesrum, samlingssal och mäss.

        Historia och invigning av Hemvärnsgården 1953:
        Hemvärnet bildades i början av 1940 som en frivillig försvarsorganisation. De fick stöd av politiska partier, SAF, LO, LRF och många andra organisationer. Den växte sig stark under kriget och efter krigsslutet 1945 var det ingen tvekan om att den skulle finnas kvar. I början av 1950-talet fick Hemvärnet i Borås vid en inspektion betyget att ha de sämsta samlingslokalerna inom hela försvarsområdet. På den tiden låg lokalerna alldeles i närheten av Sven Eriksonplatsen.
      `,
      textToday2: `
        1953 fick Borås Hemvärn möjlighet att förfoga över Villa Armbåga vid Älgårdsvägen, granne med tennishallen. Det blev en klar förbättring. Villan uppfördes 1899 för A-B klädningstysfabrik och har ritats av arkitekt Lars Kellman. Den hade elva rum och kök och en stor trädgård. Läget nära Rya Åsar erbjöd också bra övningsmöjligheter.

        Glädjen var därför stor den vackra försommardagen, söndagen den 7 juni 1953, då den nya hemvärnsgården invigdes. Invigningsdagen inleddes med att Hemvärnets musikkår under musik marscherade genom Borås. På uppställningsplatsen vid den nya hemvärnsgården överlämnade dåvarande hemvärnschefen Nils Larsson sina mannar till general Sven Colliander som höll tal och gratulerade Boråsarna till den nya samlingsplatsen varpå han förklarade den nya hemvärnsgården invigd.

        Därefter följde leven för fosterlandet, nationalsång, flagghissning och utdelning av medaljer, plaketter och förtjänsttecken. Hemvärnet fick många lyckönskningar till de nya lokalerna. Borås lottakårs ordförande Margit Nilsson överlämnade en check på 5 000 kronor. Civilförsvar och FBU uppvaktade genom Rudolf Antonsson och Gösta Smedel, Borås kvinnliga bilkår genom Siri Garby. Därefter drack man kaffe och hade det trevligt. På kvällen gav Borås stad middag för en rad inbjudna med anledning av hemvärnsgårdens invigning. I tal framhöll Tore G. Wärenstam (h), stadsfullmäktiges vice ordförande det goda samarbete som alltid funnits mellan staden och hemvärnet.
      `,
      textThen1: `
         <strong>Borås då</strong>
         Hemvärnet i Sverige bildades i början av 1940 som en frivillig försvarsorganisation. Stöd fick Hemvärnet av de politiska partierna, av SAF, LO, LRF och många andra organisationer. Det växte sig starkt under kriget och vid krigsslutet 1945 var det ingen i ansvarig ställning som talade om att det skulle upplösas. I början av 1950-talet hade Hemvärnet i Borås vid en inspektion fått betyget att ha de sämsta samlingslokalerna inom hela försvarsområdet. De låg alldeles i närheten av Sven Eriksonplatsen.

         När Villa Armbåga vid Älgårdsvägen, granne med tennishallen, 1953 ställdes till Borås-hemvärnets förfogande blev situationen en helt annan. Villan som ritats av arkitekt Lars Kellman och uppförts 1899 för A-B Borås klädningstysfabriks räkning, hade elva rum och kök. Den hade en stor trädgård och låg nära Rya Åsar, som erbjöd utmärkta övningsmöjligheter. Kanske hade man nu i Borås fått försvarsområdets bästa hemvärnsgård. Glädjen var därför stor hos hemvärnsmännen invigningsdagen i juni 1953.
        `,
      textThen2: `
         Invigningsdagens festligheter inleddes med att Hemvärnets musikkår under musik marscherade genom Borås. På den nya hemvärnsgårdens uppställningsplats överlämnade hemvärnschefen i Borås Nils Larsson sina mannar till general Sven Colliander. Denna höll sedan ett tal, vari han gratulerade boråsarna till den nya samlingsplatsen och tackade dem för deras "självuppoffrande och uppskattade arbete i det frivilliga försvarets tjänst" enligt Borås Tidning, varpå han förklarade hemvärnsgården invigd.

         Därefter följde leven för fosterlandet, nationalsång, flagghissning och utdelning av medaljer, plaketter och förtjänsttecken. Många ville denna dag lyckönska hemvärnet i Borås till de nya lokalerna. Först ut var Borås lottakår som genom sin ordförande fru Margit Nilsson från lottorna överlämnade en check på 5000 kronor, då hon visste "hur dyrt det är att sätta bo". Civilförsvaret och FBU uppvaktade genom Rudolf Antonsson och Gösta Smedel, Borås kvinnliga bilkår genom fru Siri Garby. Hemvärnschefen Nils Larsson tackade dem och hoppades att den nya hemvärnsgården skulle bli till gagn för alla i det frivilliga försvarets tjänst. Därefter övergick man till att dricka kaffe i all gemytlighet.

         Sedan också riksdagsman Carl Lindberg (s), ordförande i hemvärnsbefälhavarnas riksförbund, gratulerat till den nya gården, tackade general Colliander å gästernas vägnar för förplägnaden. På kvällen gav Borås stad middag för en rad inbjudna med anledning av hemvärnsgårdens invigning. I tal framhöll Tore G. Wärenstam (h), stadsfullmäktiges vice ordförande, och general Colliander det goda förhållande, som alltid rått i Borås mellan staden och hemvärnet.
        `,
    };
  },
};
</script>
