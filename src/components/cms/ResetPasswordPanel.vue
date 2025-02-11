<script setup>
import Button from "../../elements/Button.vue";
import Input from "../../elements/Input.vue";
import { requiredFields } from "../../js/requiredFields.js";
import { emailValidator } from "../../js/emailValidator.js";
</script>

<template>
  <div class="flex flex-col items-center px-4 py-12 md:px-8">
    <form
      @submit.prevent
      class="grid w-full gap-2 sm:w-2/3 md:w-1/2"
      name="reset-password"
    >
      <div>Reset password</div>

      <Input
        v-model="loginEmail"
        @update-value="loginEmail = $event"
        name="email"
        type="email"
        placeholder-text="Enter email address"
        autocomplete="email"
      />

      <Button
        @click="resetPasswordForm"
        :text="buttonText"
        link=""
        hash=""
        type="submit"
        data-wait="Please wait..."
        styling="#548b63"
        class="mt-4 !bg-[#548b63] text-white hover:!bg-[#6bad7d]"
      />

      <div
        @click="$emit('loginSwitch')"
        class="flex cursor-pointer justify-self-start text-sm underline hover:text-white/75"
      >
        Know your password?
      </div>
    </form>

    <div
      v-if="showStatusMessage"
      class="mt-12 w-full bg-[#a38373] p-4 text-base text-black sm:w-2/3 md:w-1/2"
    >
      {{ statusMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ResetPasswordPanel",

  data() {
    return {
      userName: `${import.meta.env.VITE_USERNAME}`,
      userPass: `${import.meta.env.VITE_USERPASS}`,
      resetPasswordPanel: false,
      loginEmail: "",
      showStatusMessage: false,
      statusMessage: "",
      buttonText: "Send password reset link",
    };
  },

  methods: {
    async resetPasswordForm(event) {
      if (!emailValidator(event.target.parentElement)) {
        this.statusMessage =
          "One or more email addresses that you have provided do not appear to have a correct format.";
        this.showStatusMessage = true;

        this.clearErrorWhenClicked();
      }

      if (
        requiredFields(event.target.parentElement) &&
        emailValidator(event.target.parentElement)
      ) {
        const savedText = this.buttonText;
        this.buttonText = event.target.dataset.wait;

        const res = await fetch("/reset", {
          method: "POST",
          headers: {
            Authorization: "Basic " + btoa(`${this.userName}:${this.userPass}`),
          },
          body: JSON.stringify({
            email: this.loginEmail,
            pageuri: window.location.href,
          }),
        });

        const jsonResponse = await res.json();

        if (jsonResponse === "ok") {
          this.statusMessage =
            "An email has been sent to your registered email address with a link to reset your password.";
          this.showStatusMessage = true;
          this.buttonText = savedText;

          this.$emit("status", "ok");
          this.loginEmail = "";
          this.clearErrorWhenClicked();
        } else if (jsonResponse === "error") {
          this.statusMessage =
            "Your email does not exist in the system, please try again.";
          this.showStatusMessage = true;
          this.buttonText = savedText;

          this.clearErrorWhenClicked();
        } else {
          this.statusMessage =
            "Something went wrong while communicating with the server, please try again.";
          this.showStatusMessage = true;
          this.buttonText = savedText;

          this.clearErrorWhenClicked();
        }
      }
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
