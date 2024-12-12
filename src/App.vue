<script setup>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div
    class="flex min-h-screen flex-col flex-nowrap items-stretch justify-between px-4"
  >
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<script>
export default {
  name: "BorasHV",
};
</script>
