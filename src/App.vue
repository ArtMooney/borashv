<script setup>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div>
    <Navbar />
    <router-view />
  </div>
  <Footer />
</template>

<script>
export default {
  name: "BorasHV",
};
</script>
