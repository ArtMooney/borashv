<script setup>
import Button from "../elements/Button.vue";
import Input from "../elements/Input.vue";
import { requiredFields } from "../js/requiredFields.js";
import { emailValidator } from "../js/emailValidator.js";
import { formCollector } from "../js/formCollector.js";
</script>

<template>
  <div
    id="member"
    class="grid grow grid-cols-1 content-center px-4 py-12 md:px-8"
  >
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
          v-model="extraFields.clientip"
        />

        <Input
          name="pageuri"
          type="text"
          placeholder-text="pageuri"
          :required="false"
          label-text=""
          v-model="extraFields.pageuri"
        />

        <Input
          name="pagename"
          type="text"
          placeholder-text="pagename"
          :required="false"
          label-text=""
          v-model="extraFields.pagename"
        />

        <Input
          name="amex"
          type="text"
          placeholder-text="amex"
          :required="false"
          label-text=""
          v-model="extraFields.amex"
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

      if (!emailValidator(event.target.form)) {
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

      if (
        requiredFields(event.target.form) &&
        emailValidator(event.target.form)
      ) {
        const res = await fetch("/member", {
          method: "POST",
          headers: {
            Authorization: "Basic " + btoa(this.userName + ":" + this.userPass),
          },
          body: formCollector(event.target.form, this.extraFields),
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
              hash: "#member",
            });
          }, 1500);
        }
      } else {
        event.target.disabled = false;
      }
    },
  },
};
</script>
