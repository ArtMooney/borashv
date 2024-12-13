<script setup>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div class="flex grow flex-col">
    <Navbar />
    <router-view />
  </div>
  <Footer />
</template>

<script>
export default {
  name: "Borås Hemvärnsförening",
};
</script>
