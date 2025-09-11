<template>
  <div
    :id="id"
    v-if="text"
    class="grid min-h-96 grid-cols-1 content-center px-4 py-12 md:px-8"
    :style="{ backgroundColor: backgroundColor }"
  >
    <div class="flex flex-col items-start">
      <h4 v-if="title" class="text-3xl uppercase">{{ title }}</h4>
      <div
        v-html="formattedText"
        class="whitespace-pre-line [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:opacity-80"
      ></div>

      <NuxtLink
        v-if="buttonText"
        :to="{
          path: buttonLink.split('#')[0],
          hash:
            buttonLink.split('#')[1] !== undefined
              ? '#' + buttonLink.split('#')[1]
              : '',
        }"
      >
        <button class="mt-12">{{ buttonText }}</button>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: "Text Block",

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
    buttonText: {
      type: String,
      required: false,
    },
    buttonLink: {
      type: String,
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
