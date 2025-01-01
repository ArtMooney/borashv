<script setup>
import Button from "../../elements/Button.vue";
import Input from "../../elements/Input.vue";
</script>

<template>
  <div class="flex justify-center px-4 py-12 md:px-8">
    <form
      @submit.prevent
      class="grid w-full gap-2 sm:w-2/3 md:w-1/2"
      name="new-password"
    >
      <div>New password</div>

      <Input
        v-model="inputPasswordOne"
        name="password"
        type="password"
        placeholder-text="Enter new password"
      />

      <Input
        v-model="inputPasswordTwo"
        name="password2"
        type="password"
        placeholder-text="Enter new password again"
      />

      <Input
        v-model="validationCode"
        name="validation"
        type="text"
        class="hidden"
      />

      <Button
        @click="newPasswordForm"
        text="Change password"
        link=""
        hash=""
        type="submit"
        data-wait="Please wait..."
        styling="#548b63"
        class="mt-4 text-white hover:bg-[#6bad7d]"
      />

      <div
        @click="$emit('loginSwitch')"
        class="cursor-pointer text-sm underline hover:text-white/75"
      >
        Know your password?
      </div>
    </form>
    <div class="success-message w-form-done"></div>
    <div class="error-message text-s w-form-fail">
      Oops! Something went wrong while resetting the password.
    </div>
  </div>
</template>

<script>
export default {
  name: "NewPasswordPanel",

  data() {
    return {
      cmsNewPass: `${import.meta.env.VITE_APP_CMS_URL}/new-password`,
      validationCode: "",
      inputPasswordOne: "",
      inputPasswordTwo: "",
      emailErrorMessage:
        "One or more email addresses that you have provided do not appear to have a correct format.",
      passwordErrorMessage:
        "Your email or password was not correct, please try again.",
      twoPasswordsErrorMessage:
        "You must enter the same password twice to confirm your new password.",
      emailReg:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
    };
  },

  methods: {
    newPasswordForm(event) {
      const successMessage =
        event.target.parentElement.getElementsByClassName("success-message")[0];
      const errorMessage =
        event.target.parentElement.getElementsByClassName("error-message")[0];
      const submitterBak = event.submitter.value;
      event.submitter.value = event.submitter.dataset.wait;

      if (!this.isPasswordSameTwice()) {
        this.triggerErrorMessage(errorMessage, this.twoPasswordsErrorMessage);
        return;
      }

      if (this.requiredFields(event.target.parentElement)) {
        fetch(this.cmsNewPass, {
          method: "POST",
          body: JSON.stringify({
            password: this.inputPasswordOne,
            validation: this.validationCode,
          }),
        })
          .then((response) => {
            if (!response.ok) throw new Error();
            return response.json();
          })
          .then((result) => {
            // console.log("success", result);

            if (result.status === "ok") {
              event.target.style.display = "none";
              successMessage.style.display = "block";

              window.location.href = window.location.href.split("?")[0];
              setTimeout(() => {
                location.reload();
              }, 1000);
            } else {
              this.triggerErrorMessage(errorMessage, this.passwordErrorMessage);
              event.submitter.value = submitterBak;
            }
          })
          .catch((error) => {
            // console.log("error");

            errorMessage.style.display = "block";
            event.submitter.value = submitterBak;
          });
      }
    },

    isPasswordSameTwice() {
      if (this.inputPasswordOne === this.inputPasswordTwo) {
        return true;
      } else {
        return false;
      }
    },

    requiredFields(form) {
      const inputs = form.querySelectorAll("input");
      const textareas = form.querySelectorAll("textarea");
      const selectors = form.querySelectorAll("select");
      let requiredFilled = true;
      let emailVerificationError = false;
      let radioButtonNames = [];

      // check inputs
      for (const input of inputs) {
        if (input.required) {
          if (!input.value) requiredFilled = false;
          if (input.type === "checkbox" && !input.checked)
            requiredFilled = false;
          if (input.type === "radio") radioButtonNames.push(input.dataset.name); // push to list with radiobutton groups
          if (input.type === "email" && !this.emailReg.test(input.value)) {
            requiredFilled = false;
            emailVerificationError = true;
          }
        }
      }

      // handle radiobuttons
      radioButtonNames = [...new Set(radioButtonNames)]; // removes duplicates

      for (const name of radioButtonNames) {
        let radioButtonCleared = 0;
        for (const input of inputs) {
          if (input.type === "radio" && input.dataset.name === name) {
            if (input.checked) radioButtonCleared++;
          }
        }
        if (!radioButtonCleared) requiredFilled = false;
      }

      // check textareas
      for (const input of textareas) {
        if (input.required) {
          if (!input.value) requiredFilled = false;
        }
      }

      // check selectors
      for (const input of selectors) {
        if (input.required) {
          if (!input.value) requiredFilled = false;
        }
      }

      if (emailVerificationError)
        this.triggerErrorMessage(
          form.parentElement.getElementsByClassName("error-message")[0],
          this.emailErrorMessage,
        );

      return requiredFilled;
    },

    triggerErrorMessage(errorMessage, message) {
      const savedErrorMessage = errorMessage.innerText;
      errorMessage.innerText = message;
      errorMessage.style.display = "block";

      setTimeout(() => {
        window.addEventListener(
          "click",
          () => {
            errorMessage.style.display = "none";
            errorMessage.innerText = savedErrorMessage;
          },
          { once: true },
        );
      }, 500);
    },
  },
};
</script>
