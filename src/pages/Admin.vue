<script setup>
import Login from "../components/cms/Login.vue";
import Cms from "../components/cms/Cms.vue";
import { getLocalStorage } from "../js/getLocalStorage.js";
</script>

<template>
  <div class="flex h-full w-full grow items-center justify-center">
    <Login
      v-if="panel === 'login'"
      @status="handleLoginStatus"
      class="mx-auto w-full max-w-screen-xl"
    />
    <Cms v-if="panel === 'cms'" />
  </div>
</template>

<script>
export default {
  name: "Admin",

  data() {
    return {
      panel: "login",
    };
  },

  created() {
    if (getLocalStorage("simple-cms-login")) {
      this.panel = "cms";
    }
  },

  methods: {
    handleLoginStatus(status) {
      if (status === "ok") {
        this.panel = "cms";
      } else {
        this.panel = "login";
      }
    },
  },
};
</script>
