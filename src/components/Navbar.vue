<script setup>
import { Vue3Lottie } from "vue3-lottie";
import NavbarDropdown from "../components/NavbarDropdown.vue";
import Cube from "../assets/Cube.vue";
import MugHot from "../assets/MugHot.vue";
import sandwich from "../assets/burger-menu.json";
import Button from "../elements/Button.vue";
import { IonIcon } from "@ionic/vue";
import { chevronDown } from "ionicons/icons";
</script>

<template>
  <div
    id="navbar"
    class="relative z-10 flex items-center justify-between m-2 bg-transparent"
  >
    <a href="/">
      <img
        src="../assets/borashv-logo-1000px.png"
        alt="navbar logo"
        class="w-20 h-20"
      />
    </a>

    <div class="flex gap-4 items-center">
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
        @click="closeMobileMenu"
      />
    </div>

    <div
      class="relative block h-8 w-8 cursor-pointer select-none items-center justify-self-end invert hover:opacity-75 sm:h-10 sm:w-10 lg:hidden"
      @click="mobileMenu"
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
      navbarClicked: false,
      hideMobileNav: true,
    };
  },

  methods: {
    mobileMenu() {
      if (!this.navbarClicked) {
        this.$refs.lottieSandwich.setSpeed(2);
        this.$refs.lottieSandwich.playSegments([7, 25], true);
      } else {
        this.$refs.lottieSandwich.setSpeed(2);
        this.$refs.lottieSandwich.playSegments([25, 7], true);
      }

      if (this.hideMobileNav) {
        this.hideMobileNav = false;

        setTimeout(() => {
          this.navbarClicked = !this.navbarClicked;
        }, 1);
      } else {
        this.navbarClicked = !this.navbarClicked;
        this.hideMobileNav = !this.hideMobileNav;
      }
    },

    closeMobileMenu() {
      this.navbarClicked = false;
      this.hideMobileNav = true;
      this.$refs.lottieSandwich.setSpeed(2);
      this.$refs.lottieSandwich.playSegments([25, 7], true);
    },
  },
};
</script>
