<script setup>
import NotFound from "../components/NotFound.vue";

useHead({
  title: "404 - Sidan kunde inte hittas | Borås Hemvärnsförening",
  meta: [
    { name: "robots", content: "noindex, nofollow" },
    {
      name: "description",
      content: "Sidan du söker kunde inte hittas.",
    },
    {
      property: "og:title",
      content: "404 - Sidan kunde inte hittas | Borås Hemvärnsförening",
    },
    {
      property: "og:description",
      content: "Sidan du söker kunde inte hittas.",
    },
  ],
});
</script>

<template>
  <div class="flex grow items-center justify-center">
    <NotFound />
  </div>
</template>
