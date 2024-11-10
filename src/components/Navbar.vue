<script setup>
import { Vue3Lottie } from "vue3-lottie";
import NavbarDropdown from "../components/NavbarDropdown.vue";
import sandwich from "../assets/burger-menu.json";
import Button from "../elements/Button.vue";
</script>

<template>
  <div
    id="navbar"
    class="relative z-10 m-2 flex items-center justify-between bg-transparent"
  >
    <a href="/">
      <img
        src="../assets/borashv-logo-1000px.png"
        alt="navbar logo"
        class="h-20 min-h-20 w-20 min-w-20"
      />
    </a>

    <div
      class="absolute right-2 top-6 flex flex-col gap-4 rounded bg-[#32382d] p-5 lg:static lg:flex-row lg:items-center lg:bg-transparent lg:p-0"
      :class="[showNavbar ? 'opacity-100' : 'opacity-0 lg:opacity-100']"
    >
      <a href="/bokningar">BOKNINGAR</a>
      <NavbarDropdown
        text="FÖRENINGEN"
        :list="[
          { text: 'Om Oss', link: '/om-oss' },
          { text: 'Styrelsen', link: '/styrelsen' },
          { text: 'Dokument', link: '/dokument' },
        ]"
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
      />
      <a href="/hemvarnsgarden">HEMVÄRNSGÅRDEN</a>
      <a href="/bli-medlem">BLI MEDLEM</a>

      <Button
        text="Kontakta oss"
        link="/contact"
        type="button"
        data-wait=""
        styling="outline"
        @click="closeNavbar"
      />
    </div>

    <div
      class="relative block h-8 w-8 cursor-pointer select-none items-center justify-self-end invert hover:opacity-75 sm:h-10 sm:w-10 lg:hidden"
      @click="openNavbar"
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
export default {
  name: "Navbar",

  data() {
    return {
      showNavbar: false,
    };
  },

  methods: {
    openNavbar() {
      this.showNavbar = true;
      this.$refs.lottieSandwich.setSpeed(2);
      this.$refs.lottieSandwich.playSegments([7, 25], true);

      // if (!this.showNavbar) {
      //   this.$refs.lottieSandwich.setSpeed(2);
      //   this.$refs.lottieSandwich.playSegments([7, 25], true);
      // } else {
      //   this.$refs.lottieSandwich.setSpeed(2);
      //   this.$refs.lottieSandwich.playSegments([25, 7], true);
      // }
    },

    closeNavbar() {
      this.showNavbar = false;
      this.$refs.lottieSandwich.setSpeed(2);
      this.$refs.lottieSandwich.playSegments([25, 7], true);
    },
  },
};
</script>
