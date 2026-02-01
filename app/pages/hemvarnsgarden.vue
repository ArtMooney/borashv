<script setup>
const staticContentStore = useStaticContentStore();
const staticContent = computed(
  () => staticContentStore.getContentByTitle("page - Hemvarnsgarden").content,
);

useCmsSeo("SEO page - Hemvarnsgarden");

definePageMeta({
  ssr: true,
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
        src="skog.jpg"
        alt="Header image"
        class="parallax-background-hero h-full min-h-92 w-full object-cover lg:min-h-172"
        sizes="320px sm:640px md:768px lg:1024px xl:1280px xxl:1536px"
        width="2000"
        height="786"
        densities="x1"
        format="webp"
      />
    </template>
  </Header>

  <SplitContentSection :text="staticContent?.textBlock?.textTodayOne">
    <template #image-content>
      <NuxtImg
        src="hemvarnsgarden.jpg"
        alt="hemvärnsgården"
        class="h-full w-full object-cover"
        sizes="320px sm:640px md:768px lg:1024px"
        width="1024"
        height="768"
        densities="x1"
        format="webp"
      />
    </template>
  </SplitContentSection>

  <SplitContentSection :text="staticContent?.textBlock?.textTodayTwo">
    <template #image-content>
      <NuxtImg
        src="overgrown-car-wreck.jpg"
        alt="överväxt bilvrak i skogen"
        class="h-full w-full object-cover lg:order-last"
        sizes="320px md:640px"
        width="2000"
        height="1333"
        densities="x1"
        format="webp"
      />
    </template>
  </SplitContentSection>

  <SplitContentSection :text="staticContent?.textBlock?.textThenOne">
    <template #image-content>
      <NuxtImg
        src="rusty-gears.jpg"
        alt="rostiga kugghjul med kedjor"
        class="h-full w-full object-cover"
        sizes="320px md:640px"
        width="2000"
        height="1333"
        densities="x1"
        format="webp"
      /> </template
  ></SplitContentSection>

  <SplitContentSection :text="staticContent?.textBlock?.textThenTwo">
    <template #image-content>
      <NuxtImg
        src="jerry-can-with-old-peeling-paint.jpg"
        alt="bensindunk med gammal flagad färg"
        class="h-full w-full object-cover lg:order-last"
        sizes="320px md:640px"
        width="1412"
        height="2000"
        densities="x1"
        format="webp"
      /> </template
  ></SplitContentSection>
</template>

<script>
export default {
  name: "Hemvarnsgarden",
};
</script>
