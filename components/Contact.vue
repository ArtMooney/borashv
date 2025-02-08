<script setup>
import Button from "../elements/Button.vue";
import Input from "../elements/Input.vue";
</script>

<template>
  <div
    id="contact"
    class="col-span-1 grid grow content-center items-center gap-8 px-4 py-12 md:px-8 lg:grid-cols-5"
  >
    <div class="lg:col-span-2">
      <h4 class="text-3xl uppercase">Eller så kontaktar vi dig!</h4>
      <p>Fyll i din e-mail så kontaktar vi dig</p>
    </div>

    <div class="lg:col-span-3">
      <form
        v-if="contactForm"
        @submit.prevent
        class="grid items-center gap-4 text-white lg:grid-cols-3"
        name="contact"
      >
        <Input
          name="email"
          type="email"
          placeholder-text="Email"
          :required="true"
          class="col-span-2"
        />

        <div class="hidden">
          <Input
            name="clientip"
            type="text"
            placeholder-text="clientip"
            :required="false"
            v-model="extraFields.clientip"
          />

          <Input
            name="pageuri"
            type="text"
            placeholder-text="pageuri"
            :required="false"
            v-model="extraFields.pageuri"
          />

          <Input
            name="pagename"
            type="text"
            placeholder-text="pagename"
            :required="false"
            v-model="extraFields.pagename"
          />

          <Input
            name="amex"
            type="text"
            placeholder-text="amex"
            :required="false"
            v-model="extraFields.amex"
          />
        </div>

        <Button
          @click="sendForm"
          :text="buttonText"
          link=""
          hash=""
          type="submit"
          data-wait="Vänta..."
          class="max-w-56"
        />
      </form>

      <div v-if="successMessage">
        <div class="mt-4 bg-[#a38373] p-4 text-black">
          {{ emailSuccessMessage }}
        </div>
      </div>

      <div v-if="errorMessage" class="mt-4 bg-[#a38373] p-4 text-black">
        <p>{{ defaultEmailMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Contact",

  data() {
    return {
      userName: `${import.meta.env.VITE_USERNAME}`,
      userPass: `${import.meta.env.VITE_USERPASS}`,
      extraFields: {
        clientip: "",
        pageuri: window.location.href,
        pagename: document.title,
        amex: "",
      },
      buttonText: "Skicka",
      defaultEmailMessage: "Något gick fel när formuläret skulle skickas.",
      emailSuccessMessage: `Tack för att ni kontaktar oss! Vi återkommer till er snart!`,
      emailErrorMessage:
        "En eller flera emailadresser som ni har angett tycks inte ha ett korrekt format.",
      emailReg:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      contactForm: true,
      successMessage: false,
      errorMessage: false,
    };
  },

  async created() {
    const res = await fetch("https://api.ipify.org?format=json");
    const ip = await res.json();
    this.extraFields.clientip = ip.ip;
  },

  methods: {
    async sendForm(event) {
      event.target.disabled = true;

      if (
        this.requiredFields(event.target.form) &&
        this.emailFormatError(event.target.form)
      ) {
        const res = await fetch("/contact", {
          method: "POST",
          headers: {
            Authorization: "Basic " + btoa(this.userName + ":" + this.userPass),
          },
          body: this.formCollector(event.target.form),
        });

        const jsonResponse = await res.json();

        if (jsonResponse === "error") {
          this.errorMessage = true;
        } else if (jsonResponse === "ok") {
          const savedText = this.buttonText;
          this.buttonText = event.target.dataset.wait;

          setTimeout(() => {
            this.contactForm = false;
            this.successMessage = true;
            this.buttonText = savedText;

            this.$router.push({
              hash: "#contact",
            });
          }, 1500);
        }
      } else {
        event.target.disabled = false;
      }
    },

    requiredFields(form) {
      const inputs = form.querySelectorAll("input");
      const textareas = form.querySelectorAll("textarea");
      const selectors = form.querySelectorAll("select");
      let requiredFilled = true;
      let radioButtonNames = [];

      for (const input of inputs) {
        if (input.required) {
          if (!input.value) requiredFilled = false;
          if (input.type === "checkbox" && !input.checked)
            requiredFilled = false;
          if (input.type === "radio") radioButtonNames.push(input.dataset.name); // push to list with radiobutton groups
        }
      }

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

      for (const input of textareas) {
        if (input.required) {
          if (!input.value) requiredFilled = false;
        }
      }

      for (const input of selectors) {
        if (input.required) {
          if (!input.value) requiredFilled = false;
        }
      }

      return requiredFilled;
    },

    emailFormatError(form) {
      let emailVerificationError = false;
      const inputs = form.querySelectorAll("input");

      for (const input of inputs) {
        if (input.type === "email" && this.emailReg.test(input.value)) {
          emailVerificationError = true;
        }
      }

      if (!emailVerificationError) {
        const savedErrorMessage = this.defaultEmailMessage;
        this.defaultEmailMessage = this.emailErrorMessage;
        this.errorMessage = true;

        setTimeout(() => {
          window.addEventListener(
            "click",
            () => {
              this.errorMessage = false;
              this.defaultEmailMessage = savedErrorMessage;
            },
            { once: true },
          );
        }, 500);
      }

      return emailVerificationError;
    },

    formCollector(form) {
      let formData = new FormData();
      formData.append("form-name", form.name);

      for (const item of form.querySelectorAll("input")) {
        if (item.type !== "submit") {
          if (item.type === "file") {
            if (item.files[0]) {
              for (const file of item.files) {
                formData.append(item.name, file, file.name);
              }
            }
          } else if (
            item.name !== "gdpr-confirm" &&
            item.name !== "clientip" &&
            item.name !== "pageuri" &&
            item.name !== "pagename" &&
            item.name !== "amex"
          ) {
            if (item.type === "checkbox") {
              formData.append(item.name, item.checked);
            } else if (item.type === "radio") {
              formData.append(item.name, item.checked);
            } else {
              formData.append(item.name, item.value);
            }
          }
        }
      }

      for (const item of form.querySelectorAll("textarea")) {
        formData.append(item.name, item.value);
      }

      for (const item of form.querySelectorAll("select")) {
        formData.append(item.name, item.value);
      }

      for (const [key, value] of Object.entries(this.extraFields)) {
        formData.append(key, value);
      }

      return formData;
    },
  },
};
</script>
