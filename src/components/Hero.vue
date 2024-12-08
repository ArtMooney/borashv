<script setup>
import Button from "../elements/Button.vue";
</script>

<template>
  <div
    class="relative grid min-h-[20rem] grid-cols-1 p-4 md:grid-cols-slim md:p-12 md:px-0 lg:min-h-[40rem]"
  >
    <div
      class="absolute bottom-0 left-0 right-0 top-0 flex items-center overflow-hidden"
    >
      <img
        class="parallax-background-hero min-h-[60rem] w-full object-cover"
        loading="lazy"
        alt=""
        src="../assets/pexels-henkephotoart-29662829-2.jpg"
      />
    </div>

    <div class="absolute bottom-0 left-0 right-0 top-0 bg-black/25"></div>

    <div
      class="relative flex flex-col items-center justify-center text-center md:col-start-2 md:col-end-2"
    >
      <h3 class="text-3xl uppercase md:text-4xl">Borås Hemvärnsförening</h3>

      <Button
        text="Bokningar"
        link="/bokningar"
        hash=""
        type="button"
        data-wait=""
        styling="dark"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",

  methods: {
    handleScroll() {
      const scrolled = window.scrollY;
      const parallaxElements = document.querySelectorAll(
        ".parallax-background-hero",
      );
      parallaxElements.forEach(function (el) {
        const rate = 0.15;
        const translateY = scrolled * rate;
        el.style.transform = `translateY(${translateY}px)`;
      });
    },
  },

  beforeMount() {
    window.addEventListener("scroll", this.handleScroll);
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>
