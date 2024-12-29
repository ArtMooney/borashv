<script setup>
import Header from "../components/Header.vue";
import BookingsList from "../components/BookingsList.vue";
import TextBlock from "../components/TextBlock.vue";
import headerImage from "../../public/assets/sean-foster-PMmb0MEE7Co-unsplash.jpg";
</script>

<template>
  <Header
    :image="headerImage"
    button-text-one="Bokningslista"
    button-link-one="/bokningar#bokningslista"
    button-text-two="Bokningsregler"
    button-link-two="/bokningar#bokningsregler"
  />
  <TextBlock
    title="Bokningar"
    :text="textBokningar"
    class="mx-auto w-full max-w-screen-xl"
  />
  <BookingsList class="mx-auto w-full max-w-screen-xl" />
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

      Bokning sker via David Wernold.
      Email: <a href="mailto:boka_hv_garden@mail.com">boka_hv_garden@mail.com</a>
      Tel./sms: <a href="tel:0703356483">0703-356483</a>

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

      Bokning sker via David Wernold.
      Email: <a href="mailto:boka_hv_garden@mail.com">boka_hv_garden@mail.com</a>
      Tel./sms: <a href="tel:0703356483">0703-356483</a>

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

  head: {
    title: "Boka Lokaler | Hemvärnsgården Borås | Konferens & Samlingssal",
    meta: [
      {
        name: "keywords",
        content:
          "hemvärnsgården borås, lokalbokning borås, konferenslokal borås, samlingssal, mäss bokning, logement borås, militär konferenslokal, möteslokal borås",
      },
      { name: "robots", content: "index, follow" },
      {
        name: "description",
        content:
          "Boka lokaler i Hemvärnsgården Borås - konferensrum, samlingssal, mäss och logement. Fullutrustat med projektor och kök. Enkel bokning via telefon eller e-post.",
      },
      {
        property: "og:title",
        content:
          "Lokalbokning Hemvärnsgården Borås - Konferens & Samlingslokaler",
      },
      {
        property: "og:description",
        content:
          "Hyr våra lokaler i centrala Borås - konferensrum, samlingssal, mäss och logement. Perfekt för möten, evenemang och övernattning. Boka enkelt via vår bokningsansvarige.",
      },
      {
        property: "og:image",
        content: headerImage,
      },
    ],
  },
};
</script>
