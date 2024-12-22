<template>
  <div class="grid grid-cols-3 gap-8 px-4 py-16 md:px-8">
    <img
      v-if="image"
      :src="image"
      loading="lazy"
      alt=""
      :class="[
        'row-start-1 h-full w-full object-cover',
        swapSides ? 'col-start-3 col-end-4' : 'col-start-1 col-end-2',
      ]"
    />

    <div
      :class="[
        'row-start-1 h-fit self-center p-8 md:px-0',
        swapSides ? 'col-start-1 col-end-3' : 'col-start-2 col-end-4',
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
