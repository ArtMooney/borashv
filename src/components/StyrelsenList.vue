<script setup>
import LoadingSpinner from "./LoadingSpinner.vue";
import { listTable } from "../js/listTable.js";
import backgroundImage from "../assets/pexels-skylar-kang-6044253-2.jpg";
</script>

<template>
  <div
    class="relative grid grid-cols-1 gap-2 px-8 py-12 lg:grid-cols-8 lg:px-0"
  >
    <div
      class="absolute bottom-0 left-0 right-0 top-0 flex items-center overflow-hidden"
    >
      <img
        :src="backgroundImage"
        class="parallax-background h-full w-full object-cover"
        loading="lazy"
        alt=""
      />
    </div>

    <div
      class="absolute bottom-0 left-0 right-0 top-0 bg-gradient-to-b from-neutral-900 to-black/75 sm:to-black/50"
    ></div>

    <h4
      class="relative col-start-1 col-end-1 text-3xl uppercase lg:col-start-2 lg:col-end-8"
    >
      Styrelsen
    </h4>

    <div
      class="relative col-start-1 col-end-1 mb-12 mt-0 h-[1px] w-full bg-white/40 lg:col-start-2 lg:col-end-8"
    ></div>

    <LoadingSpinner
      v-if="!itemsLoaded && !showErrorMessage"
      class="col-start-1 col-end-1 lg:col-start-2 lg:col-end-8"
    />

    <div
      v-if="itemsLoaded"
      class="col-start-1 col-end-1 flex flex-row flex-wrap justify-start lg:col-start-2 lg:col-end-8"
    >
      <div
        v-for="item of sortedItems"
        :key="item.id"
        class="relative w-[25rem] text-xs sm:w-[16rem] md:w-[21rem] md:text-sm xl:w-[19rem]"
      >
        <img src="../assets/dogtag.png" :alt="item.name" />
        <div
          class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pb-5 pr-4 md:pb-8 md:pr-8"
        >
          <span class="text-base font-bold md:text-lg">{{ item.name }}</span
          ><br />
          {{ item.title }}<br v-if="item.title" />
          {{ item.email }}<br v-if="item.email" />
          {{ item.phone }}<br v-if="item.phone" />
        </div>
      </div>
    </div>

    <div
      v-if="showErrorMessage"
      class="col-start-1 col-end-1 bg-[#a38373] p-4 text-black lg:col-start-2 lg:col-end-8"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: "StyrelsenList",

  data() {
    return {
      items: {},
      itemsLoaded: false,
      errorMessage: "",
      showErrorMessage: false,
    };
  },

  computed: {
    sortedItems() {
      return [...this.items].sort((a, b) => a.id - b.id);
    },
  },

  async created() {
    this.items = await listTable(`${import.meta.env.VITE_BASEROW_STYRELSEN}`);

    if (this.items.error) {
      this.errorMessage = "Något gick fel när listan skulle hämtas.";
      this.itemsLoaded = false;
      this.showErrorMessage = true;
    } else if (this.items.results.length > 0) {
      this.items = this.items.results;
      this.itemsLoaded = true;
    } else {
      this.errorMessage =
        "Kan inte ladda några personer från styrelsen för tillfället.";
      this.itemsLoaded = false;
      this.showErrorMessage = true;
    }
  },

  methods: {
    handleScroll() {
      const scrolled = window.scrollY;
      const parallaxElements = document.querySelectorAll(
        ".parallax-background",
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
