<script setup>
import { IonIcon } from "@ionic/vue";
import { call } from "ionicons/icons";
import { mail } from "ionicons/icons";
import { location } from "ionicons/icons";
</script>

<template>
  <div
    class="relative grid min-h-[30rem] w-full items-center justify-center gap-24 px-4 py-16 md:px-8 lg:grid-cols-3"
  >
    <div class="absolute bottom-0 left-0 right-0 top-0 overflow-hidden">
      <img
        class="h-full w-full object-cover opacity-25"
        loading="lazy"
        alt="image of old wood background"
        src="../assets/old-wood.jpg"
      />
    </div>

    <a class="relative flex flex-col items-center" href="tel:070-22777161">
      <ion-icon :icon="call" class="mb-4 h-20 w-20 text-white"></ion-icon>
      <div>Mobil:</div>
      <div class="underline">070-22777161</div>
    </a>
    <a
      class="relative flex flex-col items-center"
      href="mailto:fanrik@hotmail.com?subject=Main från Borås Hemvärnsförenings hemsida"
    >
      <ion-icon :icon="mail" class="mb-4 h-20 w-20 text-white"></ion-icon>
      <div>Email:</div>
      <div class="underline">fanrik@hotmail.com</div>
    </a>
    <a
      class="relative flex flex-col items-center"
      href="https://www.google.com/maps/place/Ålgårdsvägen+29,+506+30+Borås/@57.7344001,12.9290169,17z/data=!3m1!4b1!4m6!3m5!1s0x465aa735fb0053b9:0xd84865a2c90a12c5!8m2!3d57.7344001!4d12.9312056!16s%2Fg%2F11c4tg9myg"
      target="_blank"
    >
      <ion-icon :icon="location" class="mb-4 h-20 w-20 text-white"></ion-icon>
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
