<template>
  <div
    :class="[
      loginPanel || resetPasswordPanel || newPasswordPanel
        ? 'login-wrapper'
        : 'login-wrapper hide1',
    ]"
  >
    <div v-show="loginPanel" class="input-container w-form">
      <form @submit.prevent="loginForm" class="login-form" data-name="login">
        <div id="w-node-_60ed6772-a919-dba9-01cf-6b098abf26ba-d10df2f5">
          Login
        </div>
        <input
          v-model="loginEmail"
          type="email"
          name="email"
          class="cms-input w-input"
          maxlength="256"
          placeholder="Enter email address"
          autofocus
          required=""
        /><input
          v-model="loginPassword"
          type="password"
          name="password"
          class="cms-input w-input"
          maxlength="256"
          placeholder="Enter password"
          required=""
        />
        <input
          type="submit"
          value="Login"
          data-wait="Please wait..."
          id="w-node-d7ba7197-8b6a-ff9d-7562-8b57f7d33f6e-d10df2f5"
          class="cms-button login w-button"
        />
        <a
          @click="resetPasswordSwitch"
          id="w-node-_6ce24ce0-9e2b-981c-b286-b44d7ea6883a-d10df2f5"
          class="text-s pointer"
          >Forgot your password?</a
        >
      </form>
      <div class="success-message w-form-done"></div>
      <div class="error-message text-s w-form-fail">
        An error occurred while sending the email.
      </div>
    </div>

    <div v-show="resetPasswordPanel" class="input-container w-form">
      <form
        @submit.prevent="resetPasswordForm"
        class="login-form"
        data-name="reset-password"
      >
        <div id="w-node-fdb51ec0-2112-7bc5-fc06-a6656f9a439c-d10df2f5">
          Reset password
        </div>
        <input
          v-model="loginEmail"
          type="email"
          class="cms-input w-input"
          maxlength="256"
          name="email"
          placeholder="Enter email address"
          autofocus
        /><input
          type="submit"
          value="Send password reset link"
          data-wait="Please wait..."
          id="w-node-_8862a37a-1930-f237-f612-0f358c05ed9a-d10df2f5"
          class="cms-button login w-button"
        />
        <a
          @click="loginSwitch"
          id="w-node-_5138d100-ab89-8d07-e386-535cf97da3f1-d10df2f5"
          class="text-s pointer"
          >Know your password?</a
        >
      </form>
      <div class="success-message w-form-done">
        An email has been sent to your registered email address with a link to
        reset your password.
      </div>
      <div class="error-message text-s w-form-fail">
        Oops! Something went wrong when sending the reset link.
      </div>
    </div>

    <div v-show="newPasswordPanel" class="input-container w-form">
      <form
        @submit.prevent="newPasswordForm"
        class="login-form"
        data-name="new-password"
      >
        <div id="w-node-fcdb5a66-c25c-e9d8-0b5d-c443f2cb77d0-d10df2f5">
          New password
        </div>
        <input
          v-model="inputPasswordOne"
          type="password"
          class="cms-input w-input"
          maxlength="256"
          name="password"
          placeholder="Enter new password"
          required=""
          autofocus
        /><input
          v-model="inputPasswordTwo"
          type="password"
          class="cms-input w-input"
          maxlength="256"
          name="password2"
          placeholder="Enter new password again"
          required=""
        /><input
          v-model="validationCode"
          type="text"
          class="cms-input hide1 w-input"
          maxlength="256"
          name="validation"
        /><input
          type="submit"
          value="Change password"
          data-wait="Please wait..."
          id="w-node-fcdb5a66-c25c-e9d8-0b5d-c443f2cb77d4-d10df2f5"
          class="cms-button login w-button"
        />
        <a
          @click="loginSwitch"
          id="w-node-fcdb5a66-c25c-e9d8-0b5d-c443f2cb77d5-d10df2f5"
          class="text-s pointer"
          >Know your password?</a
        >
      </form>
      <div class="success-message w-form-done"></div>
      <div class="error-message text-s w-form-fail">
        Oops! Something went wrong while resetting the password.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",

  data() {
    return {
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
    this.loginHandler();

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
      this.loginPanel = true;
      this.resetPasswordPanel = false;
      this.newPasswordPanel = false;

      const urlWithoutQueryString = window.location.href.split("?")[0];
      history.replaceState({}, document.title, urlWithoutQueryString);
      this.extraFields.pageuri = urlWithoutQueryString;
    },

    resetPasswordSwitch() {
      this.loginPanel = false;
      this.resetPasswordPanel = true;
      this.newPasswordPanel = false;

      const urlWithoutQueryString = window.location.href.split("?")[0];
      history.replaceState({}, document.title, urlWithoutQueryString);
      this.extraFields.pageuri = urlWithoutQueryString;
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
                1000 * 60 * 43200
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
        "success-message"
      )[0];
    },

    getErrorElement(event) {
      return event.target.parentElement.getElementsByClassName(
        "error-message"
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
          this.emailErrorMessage
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
          { once: true }
        );
      }, 500);
    },
  },
};
</script>
