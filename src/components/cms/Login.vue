<script setup>
import LoginPanel from "./LoginPanel.vue";
import ResetPasswordPanel from "./ResetPasswordPanel.vue";
import NewPasswordPanel from "./NewPasswordPanel.vue";
</script>

<template>
  <div>
    <LoginPanel
      v-if="panel === 'login'"
      @resetPasswordPanel="resetPasswordSwitch"
    />
    <ResetPasswordPanel
      v-if="panel === 'resetPassword'"
      @loginSwitch="loginSwitch"
    />
    <NewPasswordPanel
      v-if="panel === 'newPassword'"
      @loginSwitch="loginSwitch"
    />
  </div>
</template>

<script>
export default {
  name: "Login",

  data() {
    return {
      panel: "login",
      userName: "FrameCore",
      userPass: "CMS-development",
      cmsLogin: `${import.meta.env.VITE_APP_CMS_URL}/login`,
      cmsReset: `${import.meta.env.VITE_APP_CMS_URL}/reset`,
      cmsValidation: `${import.meta.env.VITE_APP_CMS_URL}/validate`,
      cmsNewPass: `${import.meta.env.VITE_APP_CMS_URL}/new-password`,
      loadingFlag: true,
      initLoadedFlag: false,
      appError: false,
      loginPanel: false,
      resetPasswordPanel: false,
      newPasswordPanel: false,
      loginEmail: "",
      loginPassword: "",
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
      extraFields: {
        clientip: "",
        pageuri: window.location.href,
        pagename: document.title,
        amex: "",
      },
    };
  },

  async created() {
    // this.loginHandler();

    const res = await fetch("https://api.ipify.org?format=json");
    const ip = await res.json();
    this.extraFields.clientip = ip.ip;
  },

  methods: {
    getCmsData(urlEndpoint, options) {
      return new Promise((resolve, reject) => {
        var requestOptions = {
          method: "GET",
          headers: {
            Authorization: "Basic " + btoa(this.userName + ":" + this.userPass),
          },
          redirect: "follow",
        };

        fetch(urlEndpoint + (options ? "?" + options : ""), requestOptions)
          .then((response) => {
            if (!response.ok) throw new Error();
            return response.json();
          })
          .then((result) => {
            // console.log(result);
            resolve(result);
          })
          .catch((error) => {
            // console.log(error);

            this.loadingFlag = false;
            this.initLoadedFlag = false;
            this.appError = true;
            reject(error);
          });
      });
    },

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
        this.newPasswordSwitch();
      } else if (!this.getLocalStorage("simple-cms-login")) {
        this.loginSwitch();
      }
    },

    loginSwitch() {
      this.panel = "login";
      this.$router.push({
        path: this.$route.path,
      });

      // const urlWithoutQueryString = window.location.href.split("?")[0];
      // history.replaceState({}, document.title, urlWithoutQueryString);
      // this.extraFields.pageuri = urlWithoutQueryString;
    },

    resetPasswordSwitch() {
      this.panel = "resetPassword";
      this.$router.push({
        path: this.$route.path,
      });

      // const urlWithoutQueryString = window.location.href.split("?")[0];
      // history.replaceState({}, document.title, urlWithoutQueryString);
      // this.extraFields.pageuri = urlWithoutQueryString;
    },

    newPasswordSwitch() {
      this.loginPanel = false;
      this.resetPasswordPanel = false;
      this.newPasswordPanel = true;
    },

    loginForm(event) {
      const successMessage = this.getSuccessElement(event);
      const errorMessage = this.getErrorElement(event);
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

    resetPasswordForm(event) {
      const successMessage = this.getSuccessElement(event);
      const errorMessage = this.getErrorElement(event);
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

    newPasswordForm(event) {
      const successMessage = this.getSuccessElement(event);
      const errorMessage = this.getErrorElement(event);
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

    getSuccessElement(event) {
      return event.target.parentElement.getElementsByClassName(
        "success-message",
      )[0];
    },

    getErrorElement(event) {
      return event.target.parentElement.getElementsByClassName(
        "error-message",
      )[0];
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
