<script setup>
const staticContentStore = useStaticContentStore();
const staticContent = computed(
  () => staticContentStore.getContentByTitle("page - Om Oss").content,
);

useCmsSeo("SEO page - Om Oss");

definePageMeta({
  ssr: true,
});
</script>

<template>
  <Header :contain-image="true">
    <template #heading-content>
      <NuxtImg
        src="hemvarnsgarden.jpg"
        alt="Header image"
        class="h-full w-full"
        sizes="320px md:1024px"
        width="1024"
        height="768"
        densities="x1"
        format="webp"
      />
    </template>
  </Header>

  <TextBlock
    :title="staticContent?.textBlock?.title"
    :text="staticContent?.textBlock?.text"
    :button-text="staticContent?.textBlock?.buttonText"
    button-link="/bli-medlem"
    class="mx-auto w-full max-w-7xl"
  />
</template>

<script>
export default {
  name: "OmOss",
};
</script>
