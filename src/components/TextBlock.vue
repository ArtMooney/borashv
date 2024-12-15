<template>
  <div
    :id="id"
    v-if="text"
    class="grid min-h-96 grid-cols-1 content-center px-8 py-12 lg:grid-cols-8 lg:px-0"
    :style="{ backgroundColor: backgroundColor }"
  >
    <div
      class="col-start-1 col-end-1 flex flex-col items-start lg:col-start-2 lg:col-end-8"
    >
      <h4 class="text-3xl uppercase">{{ title }}</h4>
      <div
        v-html="formattedText"
        class="whitespace-pre-line [&>a:hover]:opacity-80 [&>a]:underline [&>a]:underline-offset-4"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Text Block",

  computed: {
    formattedText() {
      return this.text.replace(/\*/g, "•").replace(/\n/g, "<br>").trim();
    },
  },

  props: {
    id: {
      type: String,
      default: "",
      required: false,
    },
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
