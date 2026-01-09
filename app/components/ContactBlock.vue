<script setup>
import IconIonCall from "~icons/ion/call";
import IconIonMail from "~icons/ion/mail";
import IconIonLocation from "~icons/ion/location";
</script>

<template>
  <div
    class="relative mx-auto grid min-h-120 w-full max-w-7xl items-center justify-center gap-24 px-4 py-16 md:px-8 lg:grid-cols-3"
  >
    <div class="absolute top-0 right-0 bottom-0 left-0 overflow-hidden">
      <NuxtImg
        src="old-wood.jpg"
        alt="bakgrund med en gammal träplanka"
        class="h-full w-full object-cover opacity-25"
        sizes="320px sm:640px md:768px lg:1024px xl:1280px xxl:1536px"
        width="2000"
        height="1333"
        densities="x1"
        format="webp"
      />
    </div>

    <a
      class="relative flex flex-col items-center"
      :href="`tel:${staticContent?.contact?.mobile}`"
    >
      <IconIonCall class="mb-4 h-20 w-20 text-white"></IconIonCall>
      <div>{{ staticContent?.contact?.mobileLabel }}</div>
      <div class="underline">
        {{ staticContent?.contact?.mobile }}
      </div>
    </a>
    <a
      class="relative flex flex-col items-center"
      :href="`mailto:${staticContent?.contact?.email}?subject=Mail från Borås Hemvärnsförenings hemsida`"
    >
      <IconIonMail class="mb-4 h-20 w-20 text-white"></IconIonMail>
      <div>{{ staticContent?.contact?.emailLabel }}</div>
      <div class="underline">
        {{ staticContent?.contact?.email }}
      </div>
    </a>
    <a
      class="relative flex flex-col items-center"
      :href="`https://www.google.com/maps/place/${encodeURIComponent(staticContent?.contact?.address)}`"
      target="_blank"
    >
      <IconIonLocation class="mb-4 h-20 w-20 text-white"></IconIonLocation>
      <div>{{ staticContent?.contact?.addressLabel }}</div>
      <div class="underline">
        {{ staticContent?.contact?.address }}
      </div>
    </a>
  </div>
</template>

<script>
import { useStaticContentStore } from "~/stores/static-content.js";

export default {
  name: "ContactBlock",

  computed: {
    staticContent() {
      return useStaticContentStore().getContentByTitle(
        "component - ContactBlock",
      ).content;
    },
  },
};
</script>
