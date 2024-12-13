<script setup>
import NotFound from "../components/NotFound.vue";
</script>

<template>
  <div class="flex h-full w-full grow items-center justify-center">
    <NotFound />
  </div>
</template>

<script>
export default {
  name: "NotFound",
  head: {
    title: "",
    meta: [
      {
        name: "keywords",
        content: "",
      },
      { name: "robots", content: "noindex, nofollow" },
      {
        name: "description",
        content: "",
      },
      {
        property: "og:title",
        content: "",
      },
      {
        property: "og:description",
        content: "",
      },
      {
        property: "og:image",
        content: "",
      },
    ],
  },
};
</script>
