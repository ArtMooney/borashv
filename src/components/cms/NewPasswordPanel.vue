<script setup>
import Button from "../../elements/Button.vue";
import Input from "../../elements/Input.vue";
import { requiredFields } from "../../js/requiredFields.js";
</script>

<template>
  <div class="flex flex-col items-center px-4 py-12 md:px-8">
    <form
      @submit.prevent
      class="grid w-full gap-2 sm:w-2/3 md:w-1/2"
      name="new-password"
    >
      <div>New password</div>

      <Input
        v-model="inputPasswordOne"
        @update-value="inputPasswordOne = $event"
        name="password"
        type="password"
        placeholder-text="Enter new password"
        :required="true"
        autocomplete="new-password"
      />

      <Input
        v-model="inputPasswordTwo"
        @update-value="inputPasswordTwo = $event"
        name="password2"
        type="password"
        placeholder-text="Enter new password again"
        :required="true"
        autocomplete="new-password"
      />

      <Button
        @click="newPasswordForm"
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
  name: "NewPasswordPanel",

  props: {
    validation: {
      type: String,
      required: false,
      default: "",
    },
  },

  data() {
    return {
      userName: `${import.meta.env.VITE_USERNAME}`,
      userPass: `${import.meta.env.VITE_USERPASS}`,
      inputPasswordOne: "",
      inputPasswordTwo: "",
      showStatusMessage: false,
      statusMessage: "",
      buttonText: "Change password",
    };
  },

  methods: {
    async newPasswordForm(event) {
      if (this.inputPasswordOne !== this.inputPasswordTwo) {
        this.statusMessage =
          "You must enter the same password twice to confirm your new password.";
        this.showStatusMessage = true;

        this.clearErrorWhenClicked();
      }

      if (
        requiredFields(event.target.parentElement) &&
        this.inputPasswordOne === this.inputPasswordTwo
      ) {
        const savedText = this.buttonText;
        this.buttonText = event.target.dataset.wait;

        const res = await fetch("/new-password", {
          method: "POST",
          headers: {
            Authorization: "Basic " + btoa(`${this.userName}:${this.userPass}`),
          },
          body: JSON.stringify({
            password: this.inputPasswordOne,
            validation: this.validation,
          }),
        });

        const jsonResponse = await res.json();

        if (jsonResponse === "ok") {
          this.statusMessage = "Your password has been successfully changed.";
          this.showStatusMessage = true;
          this.buttonText = savedText;
          this.inputPasswordOne = "";
          this.inputPasswordTwo = "";

          this.$emit("status", "ok");
          this.clearErrorWhenClicked();
        } else if (jsonResponse) {
          this.statusMessage = `Error: ${jsonResponse.error}`;
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
