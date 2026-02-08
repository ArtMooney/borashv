<script setup>
const config = useRuntimeConfig();
const staticContentStore = useStaticContentStore();
const staticContent = computed(
  () => staticContentStore.getContentByTitle("page - Index").content,
);

useCmsSeo("SEO page - Index");

definePageMeta({
  ssr: true,
});

const { data: items, error } = await useFetch("/api/nyheter", {
  method: "GET",
  headers: {
    Authorization:
      "Basic " + btoa(config.public.userName + ":" + config.public.userPass),
  },
  default: () => [],
});
</script>

<template>
  <Header
    :title="staticContent?.header?.title"
    :button-text-one="staticContent?.header?.buttonTextOne"
    button-link-one="/bokningar"
  >
    <template #heading-content>
      <NuxtImg
        src="deep-forest-with-backlight.jpg"
        alt="Header image"
        class="parallax-background-hero h-full min-h-92 w-full object-cover lg:min-h-172"
        sizes="320px sm:640px md:768px lg:1024px xl:1280px xxl:1536px"
        width="2000"
        height="1333"
        densities="x1"
        format="webp"
      />
    </template>
  </Header>

  <LoadingSpinner v-if="!items?.length && !error" />

  <News
    v-if="items.length > 0"
    class="mx-auto w-full max-w-7xl"
    :items="items"
  />

  <div
    v-if="error"
    class="mx-auto my-16 w-full max-w-7xl bg-[#a38373] p-4 px-8 text-black"
  >
    {{ decodeURIComponent(error?.statusMessage || "Error") }}
  </div>
</template>

<script>
export default {
  name: "Index",
};
</script>
