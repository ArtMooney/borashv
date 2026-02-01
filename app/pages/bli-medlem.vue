<script setup>
const staticContentStore = useStaticContentStore();
const staticContent = computed(
  () => staticContentStore.getContentByTitle("page - Bli Medlem").content,
);

useCmsSeo("SEO page - Bli Medlem");

definePageMeta({
  ssr: true,
});
</script>

<template>
  <Header>
    <template #heading-content>
      <NuxtImg
        src="closeup-bridge.jpg"
        alt="Header image"
        class="parallax-background-hero h-full min-h-92 w-full object-cover lg:min-h-172"
        sizes="320px sm:640px md:768px lg:1024px xl:1280px xxl:1536px"
        width="2000"
        height="1330"
        densities="x1"
        format="webp"
      /> </template
  ></Header>

  <TextBlock
    :title="staticContent?.textBlock?.title"
    :text="staticContent?.textBlock?.text"
    class="mx-auto w-full max-w-7xl"
  />

  <Member />
</template>

<script>
export default {
  name: "BliMedlem",
};
</script>
