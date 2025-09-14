<script setup>
import IconIonHeart from "~icons/ion/heart";
</script>

<template>
  <div
    class="bg-footer-gradient font-heading relative grid grid-cols-1 place-items-center gap-4 py-12 text-center text-neutral-400 no-underline md:grid-cols-3 md:px-28 md:text-start lg:py-24 xl:px-72"
  >
    <div
      class="absolute top-0 right-0 bottom-0 left-0 flex items-center overflow-hidden"
    >
      <NuxtImg
        src="rusty-metal.jpg"
        alt="Footer background"
        class="h-full w-full object-cover"
        sizes="1000px md:2000px"
        width="4000"
        height="2667"
        densities="x1"
        format="webp"
      />
    </div>

    <div class="absolute top-0 right-0 bottom-0 left-0 bg-[#31382df5]/80"></div>

    <router-link to="/">
      <NuxtImg
        src="borashv-logo.png"
        alt="footer logo"
        class="relative mb-6 h-36 min-h-36 w-36 min-w-36 md:mb-4 md:h-40 md:min-h-40 md:w-40 md:min-w-40"
        width="1000"
        height="1000"
        densities="x1"
        format="webp"
      />
    </router-link>

    <div class="relative flex flex-col">
      <router-link class="mb-3 hover:text-neutral-300" to="/dokument#navbar"
        >Dokument
      </router-link>
      <router-link
        class="mb-3 hover:text-neutral-300"
        to="/hemvarnsgarden#navbar"
        >Hemvärnsgården
      </router-link>
      <router-link class="mb-3 hover:text-neutral-300" to="/bli-medlem#navbar"
        >Bli medlem
      </router-link>
      <router-link class="mb-3 hover:text-neutral-300" to="/styrelsen#navbar"
        >Styrelsen
      </router-link>
    </div>

    <div class="relative flex flex-col">
      <router-link class="mb-3 hover:text-neutral-300" to="/bokningar#navbar"
        >Bokningar
      </router-link>
      <router-link class="mb-3 hover:text-neutral-300" to="/kontakta-oss#navbar"
        >Kontakta Oss
      </router-link>
      <router-link class="mb-3 hover:text-neutral-300" to="/admin#navbar"
        >Admin
      </router-link>
    </div>

    <div
      class="relative col-span-1 my-12 h-0.5 w-2/3 bg-neutral-500/75 md:col-span-3"
    ></div>

    <a
      class="absolute bottom-3 col-span-1 flex text-xs text-white/50 opacity-50 hover:text-white/75 md:col-span-3"
      href="https://www.framecore.se"
      target="_blank"
    >
      Powered by
      <span
        ><IconIonHeart class="h-4 w-4 px-0.5 text-red-600"></IconIonHeart
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
