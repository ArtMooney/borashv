<script setup>
import { Vue3Lottie } from "vue3-lottie";
import NavbarLink from "../elements/NavbarLink.vue";
import Cube from "../assets/Cube.vue";
import MugHot from "../assets/MugHot.vue";
import sandwich from "../assets/burger-menu.json";
import Button from "../elements/Button.vue";
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
      <a href="/">BOKNINGAR</a>
      <a href="/">FÖRENINGEN</a>
      <a href="/">LÄNKAR</a>
      <a href="/">HEMVÄRNSGÅRDEN</a>
      <a href="/">BLI MEDLEM</a>

      <!--      <NavbarLink-->
      <!--        path="/"-->
      <!--        hash="#services"-->
      <!--        :icon="Cube"-->
      <!--        @click="closeMobileMenu"-->
      <!--        >Tjänster-->
      <!--      </NavbarLink>-->

      <!--      <NavbarLink path="/case" hash="" :icon="MugHot" @click="closeMobileMenu"-->
      <!--        >Kunder &amp; Case-->
      <!--      </NavbarLink>-->

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
