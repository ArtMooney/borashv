<script setup>
import Button from "../elements/Button.vue";
import Input from "../elements/Input.vue";
</script>

<template>
  <div class="grid grow grid-cols-1 content-center px-4 py-12 md:px-8">
    <form
      v-if="contactForm"
      @submit.prevent
      class="grid grid-cols-1 gap-4 text-white md:grid-cols-2"
      name="member"
    >
      <Input
        name="firstname"
        type="text"
        placeholder-text=""
        :required="true"
        label-text="Förnamn:"
      />

      <Input
        name="lastname"
        type="text"
        placeholder-text=""
        :required="true"
        label-text="Efternamn:"
      />

      <Input
        name="email"
        type="email"
        placeholder-text=""
        :required="true"
        label-text="Email:"
      />

      <Input
        name="phone"
        type="tel"
        placeholder-text=""
        :required="true"
        label-text="Telefon:"
      />

      <Input
        name="company"
        type="text"
        placeholder-text=""
        :required="true"
        label-text="Företag:"
      />

      <Input
        class="col-span-1 md:col-span-2"
        name="message"
        type="message"
        placeholder-text=""
        :required="true"
        label-text="Meddelande:"
      />

      <div class="hidden">
        <Input
          name="clientip"
          type="text"
          placeholder-text="clientip"
          :required="false"
          label-text=""
          :value="extraFields.clientip"
        />

        <Input
          name="pageuri"
          type="text"
          placeholder-text="pageuri"
          :required="false"
          label-text=""
          :value="extraFields.pageuri"
        />

        <Input
          name="pagename"
          type="text"
          placeholder-text="pagename"
          :required="false"
          label-text=""
          :value="extraFields.pagename"
        />

        <Input
          name="amex"
          type="text"
          placeholder-text="amex"
          :required="false"
          label-text=""
          :value="extraFields.amex"
        />
      </div>

      <div class="flex items-start pt-8">
        <Button
          @click="sendForm"
          :text="buttonText"
          link=""
          hash=""
          type="submit"
          data-wait="Vänta..."
        />
      </div>
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
</template>

<script>
export default {
  name: "Member",

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
      emailSuccessMessage: `Tack för ert meddelande! Vi återkommer till er snart!`,
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
        const res = await fetch("/member", {
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
