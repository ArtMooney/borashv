<template>
  <div class="flex h-8 w-8 items-center justify-center">
    <svg class="animate-spin" viewBox="0 0 50 50">
      <circle
        class="animate-[dash_1.5s_ease-in-out_infinite] fill-none stroke-[5px]"
        :style="{
          stroke: color,
          strokeDasharray: '90,150',
          strokeDashoffset: 0,
        }"
        cx="25"
        cy="25"
        r="18"
        stroke-linecap="round"
      ></circle>
    </svg>
  </div>
</template>

<script>
export default {
  name: "LoadingSpinner",

  props: {
    color: {
      type: String,
      required: false,
      default: "white",
    },
  },
};
</script>
