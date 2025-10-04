<script setup>
import { Vue3Lottie } from "vue3-lottie";
import sandwich from "../assets/burger-menu.json";
</script>

<template>
  <div
    id="navbar"
    class="font-heading relative z-10 flex items-center justify-between bg-transparent p-4 py-2"
  >
    <NuxtLink to="/">
      <NuxtImg
        src="borashv-logo.png"
        alt="navbar logo"
        class="h-14 min-h-14 w-14 min-w-14 md:h-20 md:min-h-20 md:w-20 md:min-w-20"
        sizes="100px md:300px"
        width="1000"
        height="1000"
        densities="x1"
        format="webp"
      />
    </NuxtLink>

    <div
      class="absolute top-4 right-3 flex flex-col gap-5 bg-[#32382d] p-6 pt-14 transition-all duration-200 ease-in-out lg:static lg:flex-row lg:items-center lg:bg-transparent lg:p-0"
      :class="[
        showNavbar
          ? 'opacity-100'
          : 'pointer-events-none right-0 opacity-0 transition-none lg:pointer-events-auto lg:opacity-100',
      ]"
    >
      <NuxtLink to="/bokningar" @click="toggleNavbar" class="hover:opacity-75"
        >BOKNINGAR
      </NuxtLink>
      <NavbarDropdown
        text="FÖRENINGEN"
        :list="[
          { text: 'Om Oss', link: '/om-oss' },
          { text: 'Styrelsen', link: '/styrelsen' },
          { text: 'Dokument', link: '/dokument' },
        ]"
        :is-mobile="isMobile"
        @button-clicked="toggleNavbar"
      />
      <NavbarDropdown
        text="LÄNKAR"
        :list="[
          {
            text: 'Hemvärnet Älvsborg',
            link: 'https://www.forsvarsmakten.se/sv/var-verksamhet/det-har-gor-forsvarsmakten/hemvarnet/elfsborgsgruppen/alvsborgsbataljonen/',
            openInNewTab: true,
            isExternal: true,
          },
          {
            text: 'Hemvärnets stridsskola',
            link: 'https://www.forsvarsmakten.se/hvss?fbclid=IwAR3c5l1LuOWExCda4RRo3RuIk_IwpgVu5mou05SMraNlxK1Ks5E9mcoixpw',
            openInNewTab: true,
            isExternal: true,
          },
          {
            text: 'Borås Lottakår',
            link: 'https://www.svenskalottakaren.se/lottakarer/boras-lottakar',
            openInNewTab: true,
            isExternal: true,
          },
          {
            text: 'Kläder Älvsborgsbataljonen',
            link: 'https://www.netshirt.se/foreningsklader/alvsborgsbataljonen',
            openInNewTab: true,
            isExternal: true,
          },
        ]"
        :is-mobile="isMobile"
        :open-in-new-tab="true"
        @button-clicked="toggleNavbar"
      />
      <NuxtLink
        to="/hemvarnsgarden"
        @click="toggleNavbar"
        class="hover:opacity-75"
        >HEMVÄRNSGÅRDEN
      </NuxtLink>
      <NuxtLink to="/bli-medlem" @click="toggleNavbar" class="hover:opacity-75"
        >BLI MEDLEM
      </NuxtLink>

      <NuxtLink to="/kontakta-oss">
        <button @click="toggleNavbar" class="white">Kontakta oss</button>
      </NuxtLink>
    </div>

    <div
      class="relative block h-8 w-8 cursor-pointer items-center justify-self-end invert select-none hover:opacity-75 sm:h-10 sm:w-10 lg:hidden"
      @click="toggleNavbar"
    >
      <ClientOnly>
        <Vue3Lottie
          ref="lottieSandwich"
          :animationData="sandwich"
          :autoPlay="false"
          :loop="false"
        />
      </ClientOnly>
    </div>
  </div>
</template>

<script>
import { getBreakpointMixin } from "../mixins/getBreakpoint.js";

export default {
  name: "Navbar",

  mixins: [getBreakpointMixin],

  data() {
    return {
      showNavbar: false,
    };
  },

  computed: {
    isMobile() {
      return !this.breakpoints.lg;
    },
  },

  methods: {
    toggleNavbar() {
      if (!this.showNavbar) {
        this.showNavbar = true;
        this.$refs.lottieSandwich.setSpeed(2);
        this.$refs.lottieSandwich.playSegments([7, 25], true);
      } else {
        this.showNavbar = false;
        this.$refs.lottieSandwich.setSpeed(2);
        this.$refs.lottieSandwich.playSegments([25, 7], true);
      }
    },
  },

  watch: {
    isMobile() {
      this.showNavbar = false;
      this.$nextTick(() => {
        this.$refs.lottieSandwich.stop();
      });
    },
  },
};
</script>
