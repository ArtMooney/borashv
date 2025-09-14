<script setup>
useHead({
  htmlAttrs: {
    lang: "sv",
  },

  script: [
    {
      key: "schema-org-data",
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Borås Hemvärnsförening",
        image:
          "https://borashv.se/_ipx/f_webp&q_80&s_2000x1333/deep-forest-with-backlight.jpg",
        url: "https://borashv.se",
        telephone: "070-22777161",
        email: "fanrik@hotmail.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Älgårdsvägen 29",
          addressLocality: "Borås",
          postalCode: "506 30",
          addressCountry: "SE",
        },
        description:
          "Borås Hemvärnsförening stödjer hemvärnsverksamheten i Borås stad sedan 2007. Vi förvaltar den historiska Hemvärnsgården och erbjuder lokalbokningar för konferenser, evenemang och övernattning.",
        sameAs: [],
        areaServed: ["Borås", "Västra Götaland", "Sverige"],
        serviceType: [
          "Lokalbokning",
          "Konferenslokal",
          "Samlingssal",
          "Mäss och evenemang",
          "Logement",
          "Föreningsverksamhet",
        ],
        foundingDate: "2007",
        makesOffer: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Lokalbokning Hemvärnsgården",
              description:
                "Uthyrning av konferensrum, samlingssal, mäss och logement i den historiska Hemvärnsgården i Borås",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Medlemskap",
              description: "Medlemskap i Borås Hemvärnsförening för 50kr/år",
            },
          },
        ],
        additionalType: "https://schema.org/NonProfitOrganization",
        knowsAbout: [
          "Hemvärnet",
          "Frivilligt försvar",
          "Lokalbokning",
          "Militärhistoria",
          "Föreningsverksamhet",
          "Hemvärnsgården",
        ],
        memberOf: {
          "@type": "Organization",
          name: "Hemvärnet",
        },
      }),
    },
  ],
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
