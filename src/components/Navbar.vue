<script setup>
import { Vue3Lottie } from "vue3-lottie";
import NavbarDropdown from "../components/NavbarDropdown.vue";
import sandwich from "../assets/old/burger-menu.json";
import Button from "../elements/Button.vue";
</script>

<template>
  <div
    id="navbar"
    class="relative z-10 flex items-center justify-between bg-transparent p-4 py-2 font-gunplay"
  >
    <a href="/">
      <img
        src="../assets/borashv-logo-1000px.png"
        alt="navbar logo"
        class="h-14 min-h-14 w-14 min-w-14 md:h-20 md:min-h-20 md:w-20 md:min-w-20"
      />
    </a>

    <div
      class="absolute right-3 top-4 flex flex-col gap-5 bg-[#32382d] p-6 pt-14 transition-all duration-200 ease-in-out lg:static lg:flex-row lg:items-center lg:bg-transparent lg:p-0"
      :class="[
        showNavbar
          ? 'opacity-100'
          : 'right-0 opacity-0 transition-none lg:opacity-100',
      ]"
    >
      <a href="/bokningar" class="hover:opacity-75">BOKNINGAR</a>
      <NavbarDropdown
        text="FÖRENINGEN"
        :list="[
          { text: 'Om Oss', link: '/om-oss' },
          { text: 'Styrelsen', link: '/styrelsen' },
          { text: 'Dokument', link: '/dokument' },
        ]"
        :is-mobile="isMobile"
      />
      <NavbarDropdown
        text="LÄNKAR"
        :list="[
          {
            text: 'Hemvärnet Älvsborg',
            link: 'https://www.forsvarsmakten.se/sv/var-verksamhet/det-har-gor-forsvarsmakten/hemvarnet/elfsborgsgruppen/alvsborgsbataljonen/',
          },
          {
            text: 'Hemvärnets stridsskola',
            link: 'https://www.forsvarsmakten.se/hvss?fbclid=IwAR3c5l1LuOWExCda4RRo3RuIk_IwpgVu5mou05SMraNlxK1Ks5E9mcoixpw',
          },
          {
            text: 'Borås Lottakår',
            link: 'https://www.svenskalottakaren.se/lottakarer/boras-lottakar',
          },
          {
            text: 'Kläder Älvsborgsbataljonen',
            link: 'https://www.netshirt.se/foreningsklader/alvsborgsbataljonen',
          },
        ]"
        :is-mobile="isMobile"
      />
      <a href="/hemvarnsgarden" class="hover:opacity-75">HEMVÄRNSGÅRDEN</a>
      <a href="/bli-medlem" class="hover:opacity-75">BLI MEDLEM</a>

      <Button
        text="Kontakta oss"
        link="/contact"
        type="button"
        data-wait=""
        styling="outline"
      />
    </div>

    <div
      class="relative block h-8 w-8 cursor-pointer select-none items-center justify-self-end invert hover:opacity-75 sm:h-10 sm:w-10 lg:hidden"
      @click="toggleNavbar"
    >
      <Vue3Lottie
        ref="lottieSandwich"
        :animationData="sandwich"
        :autoPlay="false"
        :loop="false"
      />
    </div>
  </div>
</template>

<script>
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

export default {
  name: "Navbar",

  data() {
    return {
      showNavbar: false,
      breakpoints: useBreakpoints(breakpointsTailwind),
    };
  },

  computed: {
    isMobile() {
      return this.breakpoints.smaller("lg").value;
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
