<template>
  <picture>
    <source
      v-for="(size, index) in ['2xl', 'xl', 'lg', 'md', 'sm', null]"
      :key="index"
      type="image/webp"
      :srcset="`${basePath}-${size || 'sm'}.webp`"
      :media="size ? `(min-width: ${getMinWidth(size)}px)` : null"
    />
    <img :src="src" :alt="alt" :class="imgClass" loading="lazy" />
  </picture>
</template>

<script>
export default {
  name: "ResponsiveImage",

  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: "",
    },
    imgClass: {
      type: String,
      default: "",
    },
  },

  methods: {
    getMinWidth(size) {
      const widths = {
        "2xl": "1536",
        xl: "1280",
        lg: "1024",
        md: "768",
        sm: "640",
      };
      return widths[size];
    },
  },

  computed: {
    basePath() {
      return this.src.replace(/\.(jpg|png|jpeg)$/i, "");
    },
  },
};
</script>
