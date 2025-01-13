<script setup>
import Login from "../components/cms/Login.vue";
import Cms from "../components/cms/Cms.vue";
import Loader from "../components/cms/Loader.vue";
import { getLocalStorage } from "../js/getLocalStorage.js";
import { deleteLocalStorage } from "../js/deleteLocalStorage.js";
</script>

<template>
  <div class="flex h-full w-full grow items-center justify-center">
    <Login
      v-if="panel === 'login'"
      @status="handleLoginStatus"
      class="mx-auto w-full max-w-screen-xl"
    />
    <Cms v-if="panel === 'cms'" @initLoadedFlag="handleInitLoaded" />
    <!--    <Loader v-if="loaderFlag" />-->
  </div>
</template>

<script>
export default {
  name: "Admin",

  data() {
    return {
      panel: "cms",
      loaderFlag: false,
      loginFlag: false,
      cmsFlag: false,
    };
  },

  created() {
    // deleteLocalStorage("simple-cms-login");

    if (!getLocalStorage("simple-cms-login")) {
      this.loginFlag = true;
    } else {
      this.loaderFlag = true;
      this.cmsFlag = true;
    }
  },

  methods: {
    handleLoginStatus(status) {
      if (status === "ok") {
        this.panel = "cms";
      }
    },

    handleInitLoaded(initLoadedFlag) {
      if (initLoadedFlag) {
        this.loaderFlag = false;
        this.cmsFlag = true;
      }
    },
  },
};
</script>
