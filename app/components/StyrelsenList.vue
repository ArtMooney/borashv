<!--<script setup>-->
<!--import LoadingSpinner from "./LoadingSpinner.vue";-->
<!--import { listTable } from "../js/listTable.js";-->
<!--import backgroundImage from "/images/pexels-skylar-kang-6044253.jpg";-->
<!--import dogtagImage from "/images/dogtag.png";-->
<!--import ResponsiveImage from "../components/ResponsiveImage.vue";-->
<!--</script>-->

<template>
  <!--  <div class="relative grow px-4 py-12 md:px-8">-->
  <!--    <div-->
  <!--      class="absolute bottom-0 left-0 right-0 top-0 flex items-center overflow-hidden"-->
  <!--    >-->
  <!--      <ResponsiveImage-->
  <!--        :src="backgroundImage"-->
  <!--        alt=""-->
  <!--        class="parallax-background h-full w-full object-cover"-->
  <!--      />-->
  <!--    </div>-->

  <!--    <div-->
  <!--      class="absolute bottom-0 left-0 right-0 top-0 bg-gradient-to-b from-neutral-900 to-black/75 sm:to-black/50"-->
  <!--    ></div>-->

  <!--    <h4 class="relative pb-8 text-3xl uppercase">Styrelsen</h4>-->

  <!--    <LoadingSpinner v-if="!itemsLoaded && !showErrorMessage" />-->

  <!--    <div-->
  <!--      v-if="itemsLoaded"-->
  <!--      class="mx-auto flex w-full max-w-screen-xl flex-row flex-wrap justify-start"-->
  <!--    >-->
  <!--      <div-->
  <!--        v-for="item of items"-->
  <!--        :key="item.id"-->
  <!--        class="relative w-[25rem] text-xs sm:w-[16rem] md:w-[21rem] md:text-sm xl:w-[19rem]"-->
  <!--      >-->
  <!--        <ResponsiveImage :src="dogtagImage" alt="item.name" />-->
  <!--        <div-->
  <!--          class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pb-5 pr-4 md:pb-8 md:pr-8"-->
  <!--        >-->
  <!--          <span class="text-base font-bold md:text-lg">{{ item.name }}</span-->
  <!--          ><br />-->
  <!--          {{ item.title }}<br v-if="item.title" />-->
  <!--          {{ item.email }}<br v-if="item.email" />-->
  <!--          {{ item.phone }}<br v-if="item.phone" />-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->

  <!--    <div v-if="showErrorMessage" class="relative bg-[#a38373] p-4 text-black">-->
  <!--      {{ errorMessage }}-->
  <!--    </div>-->
  <!--  </div>-->
</template>

<!--<script>-->
<!--export default {-->
<!--  name: "StyrelsenList",-->

<!--  data() {-->
<!--    return {-->
<!--      items: {},-->
<!--      itemsLoaded: false,-->
<!--      errorMessage: "",-->
<!--      showErrorMessage: false,-->
<!--    };-->
<!--  },-->

<!--  async created() {-->
<!--    this.items = await listTable(`${import.meta.env.VITE_BASEROW_STYRELSEN}`);-->

<!--    if (this.items.error) {-->
<!--      this.errorMessage = "Något gick fel när listan skulle hämtas.";-->
<!--      this.itemsLoaded = false;-->
<!--      this.showErrorMessage = true;-->
<!--    } else if (this.items.results.length > 0) {-->
<!--      this.items = this.items.results;-->
<!--      this.itemsLoaded = true;-->
<!--    } else {-->
<!--      this.errorMessage =-->
<!--        "Kan inte ladda några personer från styrelsen för tillfället.";-->
<!--      this.itemsLoaded = false;-->
<!--      this.showErrorMessage = true;-->
<!--    }-->
<!--  },-->

<!--  methods: {-->
<!--    handleScroll() {-->
<!--      const scrolled = window.scrollY;-->
<!--      const parallaxElements = document.querySelectorAll(-->
<!--        ".parallax-background",-->
<!--      );-->
<!--      parallaxElements.forEach(function (el) {-->
<!--        const rate = 0.25;-->
<!--        const translateY = scrolled * rate;-->
<!--        el.style.transform = `translateY(${translateY}px)`;-->
<!--      });-->
<!--    },-->
<!--  },-->

<!--  beforeMount() {-->
<!--    window.addEventListener("scroll", this.handleScroll);-->
<!--  },-->

<!--  beforeUnmount() {-->
<!--    window.removeEventListener("scroll", this.handleScroll);-->
<!--  },-->
<!--};-->
<!--</script>-->
