<script setup>
const config = useRuntimeConfig();
const staticContentStore = useStaticContentStore();
const staticContent = computed(
  () => staticContentStore.getContentByTitle("page - Styrelsen").content,
);

useCmsSeo("SEO page - Styrelsen");

definePageMeta({
  ssr: true,
});

const { data: items, error } = await useFetch("/api/styrelsen", {
  method: "GET",
  headers: {
    Authorization:
      "Basic " + btoa(config.public.userName + ":" + config.public.userPass),
  },
  default: () => [],
});
</script>

<template>
  <div class="relative grow px-4 py-12 md:px-8">
    <div
      class="absolute top-0 right-0 bottom-0 left-0 flex items-center overflow-hidden"
    >
      <NuxtImg
        src="old-plank.jpg"
        alt="background image"
        class="parallax-background h-full w-full object-cover"
        sizes="2000px"
        width="2000"
        height="1325"
        densities="x1"
        format="webp"
      />
    </div>

    <div
      class="absolute top-0 right-0 bottom-0 left-0 bg-linear-to-b from-neutral-900 to-black/75 sm:to-black/50"
    ></div>

    <h4 class="relative pb-8 text-3xl uppercase">
      {{ staticContent?.header?.title }}
    </h4>

    <LoadingSpinner v-if="!items?.length && !error" />

    <div
      v-if="error"
      class="relative mx-auto my-16 w-full max-w-7xl bg-[#a38373] p-4 px-8 text-black"
    >
      {{ decodeURIComponent(error?.statusMessage || "Error") }}
    </div>

    <div
      v-if="items?.length"
      class="mx-auto flex w-full max-w-7xl flex-row flex-wrap justify-start"
    >
      <div
        v-for="item of items"
        :key="item.id"
        class="relative w-100 text-xs sm:w-[16rem] md:w-84 md:text-sm xl:w-76"
      >
        <NuxtImg
          src="dogtag.png"
          :alt="`dog tag image with the name ${item.name}`"
          sizes="200px sm:300px md:400px"
          width="1086"
          height="644"
          densities="x1"
          format="webp"
        />
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pr-4 pb-5 md:pr-8 md:pb-8"
        >
          <span class="text-base font-bold md:text-lg">{{ item.name }}</span
          ><br />
          {{ item.title }}<br v-if="item.title" />
          {{ item.email }}<br v-if="item.email" />
          {{ item.phone }}<br v-if="item.phone" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Styrelsen",

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
