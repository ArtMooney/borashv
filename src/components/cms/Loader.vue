<template>
  <div class="loader">
    <div class="loader-container">
      <Vue3Lottie :animationData="loaderAnim" :height="100" :width="200" />
      <div class="text-s">Loading</div>
    </div>
  </div>
</template>

<script>
import { Vue3Lottie } from "vue3-lottie";
import loaderAnim from "../../assets/77076-loading.json";

export default {
  name: "Loader",
  components: { Vue3Lottie },

  data() {
    return {
      loaderAnim,
    };
  },
};
</script>
