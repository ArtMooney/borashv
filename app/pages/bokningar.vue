<script setup>
useSeoMeta({
  title: "Boka Lokaler | Hemvärnsgården Borås | Konferens & Samlingssal",
  description:
    "Boka lokaler i Hemvärnsgården Borås - konferensrum, samlingssal, mäss och logement. Fullutrustat med projektor och kök. Enkel bokning via telefon eller e-post.",
  ogTitle: "Lokalbokning Hemvärnsgården Borås - Konferens & Samlingslokaler",
  ogDescription:
    "Hyr våra lokaler i centrala Borås - konferensrum, samlingssal, mäss och logement. Perfekt för möten, evenemang och övernattning. Boka enkelt via vår bokningsansvarige.",
  ogImage: "https://borashv.se/og-image.webp",
  ogUrl: "https://borashv.se/bokningar",
  ogType: "website",
  ogSiteName: "Borås Hemvärnsförening",
  ogLocale: "sv_SE",
  twitterCard: "summary_large_image",
  twitterTitle:
    "Lokalbokning Hemvärnsgården Borås - Konferens & Samlingslokaler",
  twitterDescription:
    "Hyr våra lokaler i centrala Borås - konferensrum, samlingssal, mäss och logement. Perfekt för möten, evenemang och övernattning.",
  twitterImage: "https://borashv.se/og-image.webp",
  keywords:
    "hemvärnsgården borås, lokalbokning borås, konferenslokal borås, samlingssal, mäss bokning, logement borås, militär konferenslokal, möteslokal borås",
  robots: "index, follow",
  author: "Borås Hemvärnsförening",
  language: "sv-SE",
});

definePageMeta({
  ssr: true,
});

const config = useRuntimeConfig();

const { data: items, error } = await useFetch("/api/bokningar", {
  method: "GET",
  headers: {
    Authorization:
      "Basic " + btoa(config.public.userName + ":" + config.public.userPass),
  },
  default: () => [],
});
</script>

<template>
  <Header
    button-text-one="Bokningskalender"
    button-link-one="/bokningar"
    button-hash-one="bokningskalender"
    button-text-two="Bokningsregler"
    button-link-two="/bokningar"
    button-hash-two="bokningsregler"
  >
    <template #heading-content>
      <NuxtImg
        src="old-overgrown-military-equipment.jpg"
        alt="Header image"
        class="parallax-background-hero h-full min-h-[23rem] w-full object-cover lg:min-h-[43rem]"
        sizes="1000px md:2000px"
        width="3456"
        height="5184"
        densities="x1"
        format="webp"
      />
    </template>
  </Header>

  <TextBlock
    title="Bokningar"
    :text="textBokningar"
    class="mx-auto w-full max-w-screen-xl"
  />

  <LoadingSpinner v-if="!items?.length && !error" />

  <BookingsCalendar
    v-if="items?.length"
    class="mx-auto w-full max-w-screen-xl"
    :items="items"
  />

  <div
    v-if="error"
    class="mx-auto my-16 w-full max-w-screen-xl bg-[#a38373] p-4 px-8 text-black"
  >
    {{ decodeURIComponent(error?.statusMessage || "Error") }}
  </div>

  <TextBlock
    id="bokningsregler"
    title="Bokningsregler"
    :text="textBokningsregler"
    class="mx-auto w-full max-w-screen-xl"
  />
</template>

<script>
export default {
  name: "Bokningar",

  data() {
    return {
      textBokningar: `
      All verksamhet i hemvärnsgården skall förbokas, även regelbunden
      återkommande verksamhet.

      Bokning sker via Joakim Gustafsson.
      E-post: <a href="mailto:7.62@minmailadress.se">7.62@minmailadress.se</a>
      Tel./sms: <a href="tel:0731-583675">0731-58 36 75</a>

      Nyckel hämtas/lämnas enl. överenskommelse.

      Bokningsbart:
      * Konferensrum
      * Samlingssal
      * Mäss
      * Logementen
      * Projektor/kopiator

      Ev. debitering enl. prislista.
      Bokningsregler finns längre ner på denna sida.
    `,
      textBokningsregler: `
      All verksamhet i hemvärnsgården skall förbokas, även regelbunden återkommande verksamhet.

      Bokning sker via Joakim Gustafsson.
      Email: <a href="mailto:7.62@minmailadress.se">7.62@minmailadress.se</a>
      Tel./sms: <a href="tel:0731-583675">0731-58 36 75</a>

      Bokningsbart:
      * Konferensrum
      * Samlingssal
      * Mäss
      * Logementen
      * Projektor/kopiator

      Allmänna regler:
      * När du bokar, tala om vilken del/delar som det gäller
      * Ev. debitering sker enl. prislista
      * Förbjudet att beträda övervåningen utan särskilt tillstånd
      * I alla bokningar ingår tillgång till kök, toalett och dusch om inget annat avtalats
      * Alla bokningar läggs genom föreningens försorg ut på hemsidan www.borashv.se
      * Den som bokar lokal skall följa städreglerna på anslagstavlan i vestibulen
      * Utebliven städning medför faktura på städavgift från föreningen
      * Städutrustning finns i städskrubb i kök
      * Skada på fastighet eller inventarier skall alltid anmälas
      * Vid användande av logement skall alltid underlakan, påslakan och örngott användas
      * Sängkläder finns att hyra för 50 kr per set
      * Utrymningsvägar vid brand och brandpostplaceringar skall beaktas
      * Rökning och införande av pälsdjur är förbjuden i samtliga utrymmen
      * Den som bokar lokal ansvarar för att dessa regler följs

      Städregler efter användning:
      * Torka av använda bord
      * Sopa av golven
      * Kolla så att det är fräscht på toaletten
      * Töm alla papperskorgar och bär ut soporna till soptunnan
      * Torka av alla bänkar + köksön i köket
      * Sopa och torka av golvet i köket

      För att behålla vår fina hemvärnsgård i bra skick så vill vi att alla hjälps åt och följer dom ovanstående punkterna.
      OBS: Om städreglerna inte följs debiteras en städkostnad på 1000:- enligt styrelsens beslut.

      /Styrelsen
    `,
    };
  },
};
</script>
