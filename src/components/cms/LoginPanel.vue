<script setup>
import Button from "../../elements/Button.vue";
import Input from "../../elements/Input.vue";
</script>

<template>
  <div class="flex justify-center px-4 py-12 md:px-8">
    <form
      @submit.prevent
      class="grid w-full gap-2 sm:w-2/3 md:w-1/2"
      name="login"
    >
      <div>Login</div>

      <Input
        v-model="loginEmail"
        name="email"
        type="email"
        placeholder-text="Enter email address"
        :required="true"
      />

      <Input
        v-model="loginPassword"
        name="password"
        type="password"
        placeholder-text="Enter password"
      />

      <Button
        @click="loginForm"
        text="Login"
        link=""
        hash=""
        type="submit"
        data-wait="Please wait..."
        class="mt-4 bg-[#548b63] text-white hover:bg-[#6bad7d]"
      />

      <div
        @click="$emit('resetPasswordPanel')"
        class="cursor-pointer text-sm underline hover:text-white/75"
      >
        Forgot your password?
      </div>
    </form>

    <div class="success-message w-form-done"></div>
    <div class="error-message text-s w-form-fail">
      An error occurred while sending the email.
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPanel",

  data() {
    return {
      cmsLogin: `${import.meta.env.VITE_APP_CMS_URL}/login`,
      cmsValidation: `${import.meta.env.VITE_APP_CMS_URL}/validate`,
      loginPanel: false,
      newPasswordPanel: false,
      loginEmail: "",
      loginPassword: "",
      validationCode: "",
      emailErrorMessage:
        "One or more email addresses that you have provided do not appear to have a correct format.",
      passwordErrorMessage:
        "Your email or password was not correct, please try again.",
      emailReg:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      extraFields: {
        clientip: "",
        pageuri: window.location.href,
        pagename: document.title,
        amex: "",
      },
    };
  },

  async created() {
    this.loginHandler();

    const res = await fetch("https://api.ipify.org?format=json");
    const ip = await res.json();
    this.extraFields.clientip = ip.ip;
  },

  methods: {
    setLocalStorage(name, value, ttl) {
      const now = new Date();
      const item = {
        value: value,
        expiry: now.getTime() + ttl,
      };
      localStorage.setItem(name, JSON.stringify(item));
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

    async loginHandler() {
      const hrefCheck = window.location.href.split("?");
      let isPasswordSwitch = false;

      if (hrefCheck.length > 1) {
        const varCheck = hrefCheck[1].split("=");

        if (varCheck[0] === "validation" && varCheck[1]) {
          const verification = await fetch(this.cmsValidation, {
            method: "POST",
            body: JSON.stringify({
              validation: varCheck[1],
            }),
          }).then((response) => response.json());

          if (verification.status === "ok") {
            isPasswordSwitch = true;
            this.validationCode = varCheck[1];
          }
        }
      }

      if (isPasswordSwitch) {
        this.loginPanel = false;
        this.newPasswordPanel = true;
      } else if (!this.getLocalStorage("simple-cms-login")) {
        this.loginPanel = true;
        this.newPasswordPanel = false;

        const urlWithoutQueryString = window.location.href.split("?")[0];
        history.replaceState({}, document.title, urlWithoutQueryString);
        this.extraFields.pageuri = urlWithoutQueryString;
      }
    },

    loginForm(event) {
      const successMessage =
        event.target.parentElement.getElementsByClassName("success-message")[0];
      const errorMessage =
        event.target.parentElement.getElementsByClassName("error-message")[0];
      const submitterBak = event.submitter.value;
      event.submitter.value = event.submitter.dataset.wait;

      if (this.requiredFields(event.target.parentElement)) {
        fetch(this.cmsLogin, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Basic " + btoa(`${this.loginEmail}:${this.loginPassword}`),
          },
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

              this.setLocalStorage(
                "simple-cms-login",
                { email: this.loginEmail, password: this.loginPassword },
                1000 * 60 * 43200,
              );

              this.loginPanel = false;
              this.$emit("status", "ok");
            } else {
              this.triggerErrorMessage(errorMessage, this.passwordErrorMessage);
              this.$emit("status", "error");
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
