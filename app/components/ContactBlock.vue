<script setup>
import IconIonCall from "~icons/ion/call";
import IconIonMail from "~icons/ion/mail";
import IconIonLocation from "~icons/ion/location";
</script>

<template>
  <div
    class="relative mx-auto grid min-h-[30rem] w-full max-w-screen-xl items-center justify-center gap-24 px-4 py-16 md:px-8 lg:grid-cols-3"
  >
    <div class="absolute top-0 right-0 bottom-0 left-0 overflow-hidden">
      <NuxtImg
        src="old-wood.jpg"
        alt="bakgrund med en gammal träplanka"
        class="h-full w-full object-cover opacity-25"
        sizes="1000px md:2000px"
        width="2000"
        height="1333"
        densities="x1"
        format="webp"
      />
    </div>

    <a class="relative flex flex-col items-center" href="tel:070-22777161">
      <IconIonCall class="mb-4 h-20 w-20 text-white"></IconIonCall>
      <div>Mobil:</div>
      <div class="underline">070-22777161</div>
    </a>
    <a
      class="relative flex flex-col items-center"
      href="mailto:fanrik@hotmail.com?subject=Main från Borås Hemvärnsförenings hemsida"
    >
      <IconIonMail class="mb-4 h-20 w-20 text-white"></IconIonMail>
      <div>Email:</div>
      <div class="underline">fanrik@hotmail.com</div>
    </a>
    <a
      class="relative flex flex-col items-center"
      href="https://www.google.com/maps/place/Ålgårdsvägen+29,+506+30+Borås/@57.7344001,12.9290169,17z/data=!3m1!4b1!4m6!3m5!1s0x465aa735fb0053b9:0xd84865a2c90a12c5!8m2!3d57.7344001!4d12.9312056!16s%2Fg%2F11c4tg9myg"
      target="_blank"
    >
      <IconIonLocation class="mb-4 h-20 w-20 text-white"></IconIonLocation>
      <div>Besöksadress:</div>
      <div class="underline">Ålgårdsvägen 29, 506 30, Borås</div>
    </a>
  </div>
</template>

<script>
export default {
  name: "ContactBlock",
};
</script>
