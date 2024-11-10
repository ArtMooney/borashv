<template>
  <button
    @click="$router.push({ path: link, hash: hash })"
    class="min-w-40 rounded bg-white/95 px-6 py-3 text-center font-gunplay uppercase text-base text-black no-underline duration-500 ease-in-out"
    :class="{
      'bg-transparent border-white border-2 text-white': styling === 'outline',
    }"
    :type="type"
    :data-wait="dataWait"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "Button",

  props: {
    text: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: false,
    },
    hash: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: true,
    },
    dataWait: {
      type: String,
      required: true,
    },
    styling: {
      type: String,
      required: false,
      default: "solid",
    },
  },
};
</script>
