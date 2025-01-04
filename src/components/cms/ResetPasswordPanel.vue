<script setup>
import Button from "../../elements/Button.vue";
import Input from "../../elements/Input.vue";
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
        name="email"
        type="email"
        placeholder-text="Enter email address"
      />

      <Button
        @click="resetPasswordForm"
        text="Send password reset link"
        link=""
        hash=""
        type="submit"
        data-wait="Please wait..."
        styling="#548b63"
        class="mt-4 !bg-[#548b63] text-white hover:!bg-[#6bad7d]"
      />

      <div
        @click="$emit('loginSwitch')"
        class="cursor-pointer text-sm underline hover:text-white/75"
      >
        Know your password?
      </div>
    </form>

    <!--    <div class="success-message w-form-done">-->
    <!--      An email has been sent to your registered email address with a link to-->
    <!--      reset your password.-->
    <!--    </div>-->
    <!--    <div class="error-message text-s w-form-fail">-->
    <!--      Oops! Something went wrong when sending the reset link.-->
    <!--    </div>-->

    <div class="mt-12 w-full bg-[#a38373] p-4 text-black sm:w-2/3 md:w-1/2">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ResetPasswordPanel",

  data() {
    return {
      cmsReset: `${import.meta.env.VITE_APP_CMS_URL}/reset`,
      resetPasswordPanel: false,
      loginEmail: "",
      emailErrorMessage:
        "One or more email addresses that you have provided do not appear to have a correct format.",
      passwordErrorMessage:
        "Your email or password was not correct, please try again.",
      emailReg:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      errorMessage:
        "An email has been sent to your registered email address with a link to reset your password.",
    };
  },

  methods: {
    resetPasswordForm(event) {
      const successMessage =
        event.target.parentElement.getElementsByClassName("success-message")[0];
      const errorMessage =
        event.target.parentElement.getElementsByClassName("error-message")[0];
      const submitterBak = event.submitter.value;
      event.submitter.value = event.submitter.dataset.wait;

      if (this.requiredFields(event.target.parentElement)) {
        fetch(this.cmsReset, {
          method: "POST",
          body: JSON.stringify({
            email: this.loginEmail,
            pageuri: window.location.href,
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

              // location.reload();
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
