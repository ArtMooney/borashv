<script setup>
import Login from "../components/cms/Login.vue";
import Cms from "../components/cms/Cms.vue";
import Loader from "../components/cms/Loader.vue";
</script>

<template>
  <Login
    v-if="loginFlag"
    @status="handleLoginStatus"
    class="mx-auto w-full max-w-screen-xl"
  />
  <Cms v-if="cmsFlag" @initLoadedFlag="handleInitLoaded" />
  <Loader v-if="loaderFlag" />
</template>

<script>
export default {
  name: "Admin",

  data() {
    return {
      loaderFlag: false,
      loginFlag: false,
      cmsFlag: false,
    };
  },

  created() {
    // this.deleteLocalStorage("simple-cms-login");

    if (!this.getLocalStorage("simple-cms-login")) {
      this.loginFlag = true;
    } else {
      this.loaderFlag = true;
      this.cmsFlag = true;
    }
  },

  methods: {
    handleLoginStatus(status) {
      if (status === "ok") {
        this.loaderFlag = true;
        this.cmsFlag = true;
      }
    },

    handleInitLoaded(initLoadedFlag) {
      if (initLoadedFlag) {
        this.loaderFlag = false;
        this.cmsFlag = true;
      }
    },

    getLocalStorage(name) {
      const itemStr = localStorage.getItem(name);

      if (!itemStr) {
        return null;
      }

      const item = JSON.parse(itemStr);
      const now = new Date();

      if (now.getTime() > item.expiry) {
        localStorage.removeItem(name);
        return null;
      }
      return item.value;
    },

    deleteLocalStorage(name) {
      localStorage.removeItem(name);
    },
  },
};
</script>

<style>
@import "../css/webflow.css";
@import "../css/simple-cms.css";
</style>
