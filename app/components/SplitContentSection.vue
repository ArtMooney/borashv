<template>
  <div
    class="mx-auto grid h-auto w-full max-w-screen-xl gap-8 px-4 py-16 md:px-8 lg:grid-cols-3"
    :class="splitHalf ? 'lg:grid-cols-2' : ''"
  >
    <slot name="image-content"></slot>

    <div
      class="h-fit self-center lg:col-span-2"
      :class="splitHalf ? 'lg:col-span-1' : ''"
    >
      <h2 v-if="textTitle" class="mb-6 text-3xl uppercase">{{ textTitle }}</h2>

      <div
        v-html="formattedText"
        class="prose prose-sm md:prose-base lg:prose-lg max-w-none space-y-4 [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:opacity-80"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SplitContentSection",

  props: {
    textTitle: {
      type: String,
      required: false,
    },
    text: {
      type: String,
      required: false,
    },
    splitHalf: {
      type: Boolean,
      default: false,
      required: false,
    },
  },

  computed: {
    formattedText() {
      return this.text.replace(/\*/g, "•").replace(/\n/g, "<br>").trim();
    },
  },
};
</script>
