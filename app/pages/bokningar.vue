<script setup>
const config = useRuntimeConfig();
const staticContentStore = useStaticContentStore();
const staticContent = computed(
  () => staticContentStore.getContentByTitle("page - Bokningar").content,
);

useCmsSeo("SEO page - Bokningar");

definePageMeta({
  ssr: true,
});

const { data: items, error } = await useFetch("/api/bokningar", {
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
    :button-text-one="staticContent?.header?.buttonTextOne"
    button-link-one="/bokningar"
    button-hash-one="bokningskalender"
    :button-text-two="staticContent?.header?.buttonTextTwo"
    button-link-two="/bokningar"
    button-hash-two="bokningsregler"
  >
    <template #heading-content>
      <NuxtImg
        src="old-overgrown-military-equipment.jpg"
        alt="Header image"
        class="parallax-background-hero h-full min-h-92 w-full object-cover lg:min-h-172"
        sizes="320px sm:640px md:768px lg:1024px xl:1280px xxl:1536px"
        width="2000"
        height="3000"
        densities="x1"
        format="webp"
      />
    </template>
  </Header>

  <TextBlock
    :title="staticContent?.text_bokningar?.title"
    :text="staticContent?.text_bokningar?.text"
    class="mx-auto w-full max-w-7xl"
  />

  <div class="mx-auto my-12 w-full max-w-7xl bg-transparent px-4 md:px-8">
    <div class="h-px w-full bg-white/15"></div>
  </div>

  <LoadingSpinner v-if="!items?.length && !error" />

  <BookingsCalendar
    v-if="items?.length"
    class="mx-auto w-full max-w-7xl"
    :items="items"
  />

  <div
    v-if="error"
    class="mx-auto my-16 w-full max-w-7xl bg-[#a38373] p-4 px-8 text-black"
  >
    {{ decodeURIComponent(error?.statusMessage || "Error") }}
  </div>

  <BookingsForm :items="items" />

  <div class="mx-auto my-12 w-full max-w-7xl bg-transparent px-4 md:px-8">
    <div class="h-px w-full bg-white/15"></div>
  </div>

  <TextBlock
    id="bokningsregler"
    :title="staticContent?.text_regler?.title"
    :text="staticContent?.text_regler?.text"
    class="mx-auto w-full max-w-7xl"
  />
</template>

<script>
export default {
  name: "Bokningar",
};
</script>
