<template>
  <div
    v-if="text"
    class="grid min-h-96 grid-cols-8 content-center"
    :style="{ backgroundColor: backgroundColor }"
  >
    <div class="col-start-2 col-end-8 flex flex-col items-start">
      <h4 class="text-3xl uppercase">{{ title }}</h4>
      <p class="pb-8">{{ text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Text Block",

  props: {
    title: {
      type: String,
      default: "",
      required: false,
    },
    text: {
      type: String,
      required: true,
    },
    backgroundColor: {
      type: String,
      default: "transparent",
      required: false,
    },
  },
};
</script>
