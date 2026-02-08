<script setup>
const config = useRuntimeConfig();
const staticContentStore = useStaticContentStore();
const staticContent = computed(
  () => staticContentStore.getContentByTitle("page - Dokument").content,
);

useCmsSeo("SEO page - Dokument");

definePageMeta({
  ssr: true,
});

const { data: items, error } = await useFetch("/api/dokument", {
  method: "GET",
  headers: {
    Authorization:
      "Basic " + btoa(config.public.userName + ":" + config.public.userPass),
  },
  default: () => [],
});
</script>

<template>
  <div
    class="mx-auto grid w-full max-w-7xl grid-cols-1 gap-2 px-4 py-12 md:px-8"
  >
    <h4 class="text-3xl uppercase">
      {{ staticContent?.header?.title }}
    </h4>

    <p class="pb-12">{{ staticContent?.header?.text }}</p>

    <LoadingSpinner
      v-if="!items?.length && !error"
      class="col-start-1 col-end-1 lg:col-start-2 lg:col-end-8"
    />

    <a
      v-if="items?.length"
      v-for="item of items"
      :href="`${config.public.imageBaseUrl}/cms-files/${item?.file}` ?? ''"
      target="_blank"
      class="flex cursor-pointer flex-row items-center justify-between border border-white/15 bg-linear-to-r from-[#32382d] to-[#353238] p-4 transition-colors duration-300 ease-in-out hover:from-[#343a2e] hover:to-[#37343a] hover:shadow-[0_0_20px_rgba(185,177,99,0.35)]"
    >
      <div
        class="bold font-heading pr-4 text-xl wrap-break-word hyphens-auto lg:text-2xl"
        lang="sv"
      >
        {{ item.name }}
      </div>

      <div class="shrink-0 border-l-2 border-white/15 pl-4">
        <NuxtImg
          v-if="item?.thumbnail"
          :src="`cms-files/${item?.thumbnail}` ?? ''"
          alt="Document thumbnail"
          class="h-32 w-auto"
          sizes="300px sm:400px"
        />
      </div>
    </a>

    <div
      v-if="error"
      class="relative mx-auto my-16 w-full max-w-7xl bg-[#a38373] p-4 px-8 text-black"
    >
      {{ decodeURIComponent(error?.statusMessage || "Error") }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Dokument",
};
</script>
