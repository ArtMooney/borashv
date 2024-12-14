<script setup>
import Button from "../elements/Button.vue";
</script>

<template>
  <div
    class="relative grid min-h-[20rem] grid-cols-1 p-4 md:grid-cols-slim md:p-12 md:px-0 lg:min-h-[40rem]"
  >
    <div
      v-if="image"
      class="absolute bottom-0 left-0 right-0 top-0 flex items-center overflow-hidden"
    >
      <img
        class="parallax-background-hero min-h-[60rem] w-full object-cover"
        loading="lazy"
        alt=""
        :src="image"
      />
    </div>

    <div class="absolute bottom-0 left-0 right-0 top-0 bg-black/25"></div>

    <div
      class="relative flex flex-col items-center justify-center text-center md:col-start-2 md:col-end-2"
    >
      <h3 v-if="title" class="text-3xl uppercase md:text-4xl">{{ title }}</h3>

      <div class="flex gap-4">
        <Button
          v-if="buttonTextOne"
          :text="buttonTextOne"
          :link="buttonLinkOne.split('#')[0]"
          :hash="
            buttonLinkOne.split('#')[1] !== undefined
              ? '#' + buttonLinkOne.split('#')[1]
              : ''
          "
          type="button"
          data-wait=""
          styling="dark"
        />

        <Button
          v-if="buttonTextTwo"
          :text="buttonTextTwo"
          :link="buttonLinkTwo.split('#')[0]"
          :hash="
            buttonLinkTwo.split('#')[1] !== undefined
              ? '#' + buttonLinkTwo.split('#')[1]
              : ''
          "
          type="button"
          data-wait=""
          styling="dark"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Hero",

  props: {
    image: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    buttonTextOne: {
      type: String,
      required: false,
    },
    buttonLinkOne: {
      type: String,
      required: false,
    },
    buttonTextTwo: {
      type: String,
      required: false,
    },
    buttonLinkTwo: {
      type: String,
      required: false,
    },
  },

  methods: {
    handleScroll() {
      const scrolled = window.scrollY;
      const parallaxElements = document.querySelectorAll(
        ".parallax-background-hero",
      );
      parallaxElements.forEach(function (el) {
        const rate = 0.25;
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
