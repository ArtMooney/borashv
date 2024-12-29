<script setup>
import { Vue3Lottie } from "vue3-lottie";
import NavbarDropdown from "../components/NavbarDropdown.vue";
import sandwich from "../assets/burger-menu.json";
import Button from "../elements/Button.vue";
import ResponsiveImage from "../components/ResponsiveImage.vue";
import imageLogo from "../assets/images/borashv-logo-1000px.png";
</script>

<template>
  <div
    id="navbar"
    class="relative z-10 flex items-center justify-between bg-transparent p-4 py-2 font-gunplay"
  >
    <router-link to="/">
      <ResponsiveImage
        :src="imageLogo"
        alt="navbar logo"
        class="h-14 min-h-14 w-14 min-w-14 md:h-20 md:min-h-20 md:w-20 md:min-w-20"
      />
    </router-link>

    <div
      class="absolute right-3 top-4 flex flex-col gap-5 bg-[#32382d] p-6 pt-14 transition-all duration-200 ease-in-out lg:static lg:flex-row lg:items-center lg:bg-transparent lg:p-0"
      :class="[
        showNavbar
          ? 'opacity-100'
          : 'pointer-events-none right-0 opacity-0 transition-none lg:pointer-events-auto lg:opacity-100',
      ]"
    >
      <router-link
        to="/bokningar"
        @click="toggleNavbar"
        class="hover:opacity-75"
        >BOKNINGAR
      </router-link>
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
      <router-link
        to="/hemvarnsgarden"
        @click="toggleNavbar"
        class="hover:opacity-75"
        >HEMVÄRNSGÅRDEN
      </router-link>
      <router-link
        to="/bli-medlem"
        @click="toggleNavbar"
        class="hover:opacity-75"
        >BLI MEDLEM
      </router-link>

      <Button
        text="Kontakta oss"
        link="/kontakta-oss"
        type="button"
        data-wait=""
        styling="outline"
        @click="toggleNavbar"
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
