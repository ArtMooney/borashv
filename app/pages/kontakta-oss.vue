<script setup>
const staticContentStore = useStaticContentStore();
const staticContent = computed(
  () => staticContentStore.getContentByTitle("page - Kontakta Oss").content,
);

useCmsSeo("SEO page - Kontakta Oss");

definePageMeta({
  ssr: true,
});
</script>

<template>
  <SplitContentSection
    :text-title="staticContent?.textBlock?.title"
    :text="staticContent?.textBlock?.text"
    :split-half="true"
  >
    <template #image-content>
      <NuxtImg
        src="militar-telefon.jpg"
        alt="gammal militär telefon"
        class="h-full w-full object-cover lg:order-last"
        sizes="320px md:640px lg:768px"
        width="2000"
        height="1500"
        densities="x1"
        format="webp"
      />
    </template>
  </SplitContentSection>

  <ContactBlock />

  <Contact />
</template>

<script>
export default {
  name: "Kontakta Oss",
};
</script>
