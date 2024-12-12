<script setup>
import { IonIcon } from "@ionic/vue";
import { chevronDown, heart } from "ionicons/icons";
</script>

<template>
  <div
    class="relative grid grid-cols-1 gap-4 bg-amber-400 bg-footer-gradient py-20"
  >
    <div
      class="absolute bottom-0 left-0 right-0 top-0 flex items-center overflow-hidden"
    >
      <img
        class="w-full object-cover"
        loading="lazy"
        alt=""
        src="../assets/donald-teel-7LOj1RlzYzU-unsplash-2.jpg"
      />
    </div>

    <div class="absolute bottom-0 left-0 right-0 top-0 bg-[#31382df5]/70"></div>

    <div class="relative">
      <a href="/">
        <img
          src="../assets/borashv-logo-1000px.png"
          alt="footer logo"
          class="h-14 min-h-14 w-14 min-w-14 md:h-20 md:min-h-20 md:w-20 md:min-w-20"
        />
      </a>

      <div class="flex flex-col items-center justify-self-center">
        <router-link
          class="mb-3 text-neutral-400 no-underline hover:text-neutral-300"
          :to="{ path: '/', hash: '#services' }"
        >
          Tjänster
        </router-link>
        <a
          class="mb-3 text-neutral-400 no-underline hover:text-neutral-300"
          href="/case"
          >Kunder & Case</a
        >
        <a
          class="mb-3 text-neutral-400 no-underline hover:text-neutral-300"
          href="/contact"
          >Kontakta oss</a
        >
      </div>

      <div
        class="mb-8 mt-4 h-0.5 w-2/3 justify-self-center bg-neutral-500/75"
      ></div>

      <a
        class="flex h-10 items-center justify-self-center text-xs text-white/50 hover:text-white/75"
        href="https://www.framecore.se"
      >
        Powered by
        <span
          ><ion-icon
            :icon="heart"
            class="h-4 w-4 px-0.5 text-red-600"
          ></ion-icon
        ></span>
        FrameCore
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>
