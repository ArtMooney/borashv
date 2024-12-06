<script setup>
import Button from "../elements/Button.vue";
</script>

<template>
  <div class="relative grid grid-cols-1 p-4 md:grid-cols-slim md:p-12 md:px-0">
    <div
      class="absolute bottom-0 left-0 right-0 top-0 flex items-center overflow-hidden"
    >
      <img
        class="parallax_background min-h-[60rem] w-full object-cover"
        loading="lazy"
        alt=""
        src="../assets/safsen_snapshot.jpg"
      />
    </div>

    <div class="absolute bottom-0 left-0 right-0 top-0 bg-black/25"></div>

    <div
      class="relative col-start-2 col-end-2 flex flex-col items-center bg-[coral]/25 text-center"
    >
      <h3 class="text-3xl uppercase md:text-4xl">Borås Hemvärnsförening</h3>
      <p class="pb-8 text-white">
        3D animation är ett kraftfullt verktyg för att skapa minnesvärda
        reklamfilmer. Det ger möjlighet till realistiska visuella effekter och
        virtuella miljöer som fångar tittarnas uppmärksamhet och ökar intresset
        för det som reklamen handlar om.
      </p>

      <Button
        text="Bokningar"
        link="/bokningar"
        hash=""
        type="button"
        data-wait=""
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
        ".parallax_background",
      );
      parallaxElements.forEach(function (el) {
        const rate = 0.1;
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
