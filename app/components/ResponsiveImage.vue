<template>
  <img
    :src="`${basePath}${originalExt}`"
    :srcset="srcSet"
    :sizes="sizes"
    :alt="alt"
    v-bind="$attrs"
    loading="lazy"
  />
</template>

<script>
export default {
  name: "ResponsiveImage",

  inheritAttrs: false,

  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: "",
    },
  },

  computed: {
    originalExt() {
      const match = this.src.match(/\.(jpg|png|jpeg)$/i);
      return match ? match[0] : ".jpg";
    },

    basePath() {
      return this.src.replace(/\.(jpg|png|jpeg)$/i, "");
    },

    srcSet() {
      return [
        `${this.basePath}-sm.webp 640w`,
        `${this.basePath}-md.webp 768w`,
        `${this.basePath}-lg.webp 1024w`,
        `${this.basePath}-xl.webp 1280w`,
        `${this.basePath}-2xl.webp 1536w`,
      ].join(", ");
    },

    sizes() {
      return [
        "(min-width: 1536px) 1536px",
        "(min-width: 1280px) 1280px",
        "(min-width: 1024px) 1024px",
        "(min-width: 768px) 768px",
        "640px",
      ].join(", ");
    },
  },
};
</script>
