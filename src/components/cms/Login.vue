<script setup>
import LoginPanel from "./LoginPanel.vue";
import ResetPasswordPanel from "./ResetPasswordPanel.vue";
import NewPasswordPanel from "./NewPasswordPanel.vue";
import LoadingSpinner from "../LoadingSpinner.vue";
import { getLocalStorage } from "../../js/getLocalStorage.js";
</script>

<template>
  <div class="py-32">
    <LoginPanel
      v-if="panel === 'login'"
      @reset-password-panel="resetPasswordSwitch"
      @status="$emit('status', $event)"
    />
    <ResetPasswordPanel
      v-if="panel === 'resetPassword'"
      @login-switch="loginSwitch"
    />
    <NewPasswordPanel
      v-if="panel === 'newPassword'"
      :validation="validationCode"
      @login-switch="loginSwitch"
    />
    <LoadingSpinner v-if="panel === 'loading'" class="justify-self-center" />

    <div class="flex flex-col items-center px-4 md:px-8">
      <div
        v-if="showStatusMessage"
        class="w-full justify-self-center bg-[#a38373] p-4 text-base text-black sm:w-2/3 md:w-1/2"
      >
        {{ statusMessage }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",

  data() {
    return {
      panel: "login",
      userName: `${import.meta.env.VITE_USERNAME}`,
      userPass: `${import.meta.env.VITE_USERPASS}`,
      validationCode: "",
      showStatusMessage: false,
      statusMessage: "Couldn't validate your code, rerouted to the login page.",
    };
  },

  async created() {
    this.loginHandler();
  },

  methods: {
    async loginHandler() {
      const hrefCheck = window.location.href.split("?");
      let isPasswordSwitch = false;

      if (hrefCheck.length > 1) {
        const varCheck = hrefCheck[1].split("=");

        if (varCheck[0] === "validation" && varCheck[1]) {
          this.panel = "loading";

          const res = await fetch("/validate", {
            method: "POST",
            headers: {
              Authorization:
                "Basic " + btoa(`${this.userName}:${this.userPass}`),
            },
            body: JSON.stringify({
              validation: varCheck[1],
            }),
          });

          const jsonResponse = await res.json();

          if (jsonResponse === "ok") {
            isPasswordSwitch = true;
            this.validationCode = varCheck[1];
          } else {
            this.showStatusMessage = true;
            this.clearErrorWhenClicked();
          }
        }
      }

      if (isPasswordSwitch) {
        this.newPasswordSwitch();
      } else if (!getLocalStorage("borashv-cms")) {
        this.loginSwitch();
      }
    },

    loginSwitch() {
      this.panel = "login";

      const urlWithoutQueryString = window.location.href.split("?")[0];
      history.replaceState({}, document.title, urlWithoutQueryString);
    },

    resetPasswordSwitch() {
      this.panel = "resetPassword";

      const urlWithoutQueryString = window.location.href.split("?")[0];
      history.replaceState({}, document.title, urlWithoutQueryString);
    },

    newPasswordSwitch() {
      this.panel = "newPassword";

      const urlWithoutQueryString = window.location.href.split("?")[0];
      history.replaceState({}, document.title, urlWithoutQueryString);
    },

    clearErrorWhenClicked() {
      setTimeout(() => {
        window.addEventListener(
          "click",
          () => {
            this.showStatusMessage = false;
          },
          { once: true },
        );
      }, 500);
    },
  },
};
</script>
