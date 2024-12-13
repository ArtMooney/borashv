<template>
  <div class="flex h-8 w-8 items-center justify-center">
    <svg class="loading-spinner" viewBox="0 0 50 50">
      <circle
        class="loading-spinner-circle"
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
};
</script>

<style scoped>
.loading-spinner {
  animation: rotate 2s linear infinite;
}

.loading-spinner-circle {
  stroke: white;
  stroke-width: 5;
  fill: none;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
</style>
