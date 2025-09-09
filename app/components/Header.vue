<template>
  <div
    class="md:grid-cols-slim relative grid grid-cols-1 md:px-0"
    :class="
      containImage ? 'min-h-min' : 'min-h-[20rem] p-4 md:p-12 lg:min-h-[40rem]'
    "
  >
    <div
      v-if="image"
      :class="
        containImage
          ? 'col-span-1 w-full md:col-span-3'
          : 'absolute top-0 right-0 bottom-0 left-0 flex items-center overflow-hidden'
      "
    >
      <NuxtImg
        :src="image"
        alt="Header image"
        :class="
          containImage
            ? 'h-full w-full'
            : 'parallax-background-hero h-full min-h-[23rem] w-full object-cover lg:min-h-[43rem]'
        "
        sizes="1000px md:2000px"
        width="3888"
        height="2592"
        densities="x1"
        format="webp"
      />
    </div>

    <div class="absolute top-0 right-0 bottom-0 left-0 bg-black/25"></div>

    <div
      class="relative flex flex-col items-center justify-center text-center md:col-start-2 md:col-end-2"
    >
      <h1
        v-if="title"
        class="text-3xl break-words hyphens-auto uppercase md:text-4xl"
        lang="sv"
      >
        {{ title }}
      </h1>

      <div class="flex flex-col gap-4 sm:flex-row">
        <button
          v-if="buttonTextOne"
          @click="navigateTo(`${buttonLinkOne}#${buttonHashOne}`)"
        >
          {{ buttonTextOne }}
        </button>

        <button
          v-if="buttonTextTwo"
          @click="navigateTo(`${buttonLinkTwo}#${buttonHashTwo}`)"
        >
          {{ buttonTextTwo }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",

  props: {
    image: {
      type: String,
      required: false,
    },
    containImage: {
      type: Boolean,
      default: false,
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
    buttonHashOne: {
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
    buttonHashTwo: {
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
