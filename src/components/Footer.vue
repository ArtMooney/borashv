<script setup>
import { IonIcon } from "@ionic/vue";
import { heart } from "ionicons/icons";
</script>

<template>
  <div
    class="bg-footer-gradient relative grid grid-cols-1 place-items-center gap-4 py-12 text-center font-gunplay text-neutral-400 no-underline md:grid-cols-3 md:px-28 md:text-start lg:py-24 xl:px-72"
  >
    <div
      class="absolute bottom-0 left-0 right-0 top-0 flex items-center overflow-hidden"
    >
      <img
        class="h-full w-full object-cover"
        loading="lazy"
        alt=""
        src="../assets/pexels-gabby-k-7794400-2.jpg"
      />
    </div>

    <div class="absolute bottom-0 left-0 right-0 top-0 bg-[#31382df5]/80"></div>

    <a href="/">
      <img
        src="../assets/borashv-logo-1000px.png"
        alt="footer logo"
        class="relative mb-6 h-36 min-h-36 w-36 min-w-36 md:mb-0 md:h-40 md:min-h-40 md:w-40 md:min-w-40"
      />
    </a>

    <div class="relative flex flex-col">
      <a class="mb-3 hover:text-neutral-300" href="/">Dokument</a>
      <a class="mb-3 hover:text-neutral-300" href="/">Hemvärnsgården</a>
      <a class="mb-3 hover:text-neutral-300" href="/">Bli medlem</a>
    </div>

    <div class="relative flex flex-col">
      <a class="mb-3 hover:text-neutral-300" href="/">Styrelsen</a>
      <a class="mb-3 hover:text-neutral-300" href="/">Bokningar</a>
      <a class="mb-3 hover:text-neutral-300" href="/">Kontakta Oss</a>
    </div>

    <div
      class="relative col-span-1 my-12 h-0.5 w-2/3 bg-neutral-500/75 md:col-span-3"
    ></div>

    <a
      class="absolute bottom-3 col-span-1 flex text-xs text-white/50 opacity-50 hover:text-white/75 md:col-span-3"
      href="https://www.framecore.se"
    >
      Powered by
      <span
        ><ion-icon :icon="heart" class="h-4 w-4 px-0.5 text-red-600"></ion-icon
      ></span>
      FrameCore
    </a>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>
