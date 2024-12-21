<template>
  <div class="grid grid-cols-1 gap-8 px-8 py-16 lg:grid-cols-8 lg:px-0">
    <img
      v-if="image"
      :src="image"
      loading="lazy"
      alt=""
      :class="[
        'h-full w-full object-cover lg:row-start-1',
        swapSides
          ? 'lg:col-start-6 lg:col-end-8'
          : 'lg:col-start-2 lg:col-end-4',
      ]"
    />

    <div
      :class="[
        'h-fit self-center p-8 md:px-0 lg:row-start-1',
        swapSides
          ? 'lg:col-start-2 lg:col-end-6'
          : 'lg:col-start-4 lg:col-end-8',
      ]"
    >
      <h2 v-if="textTitle" class="text-3xl uppercase">{{ textTitle }}</h2>

      <div
        v-html="formattedText"
        class="whitespace-pre-line [&>a:hover]:opacity-80 [&>a]:underline [&>a]:underline-offset-4"
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
    image: {
      type: String,
      required: false,
    },
    swapSides: {
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
