<template>
  <div
    id="member"
    class="mx-auto grid w-full max-w-screen-xl grow grid-cols-1 content-center px-4 py-12 md:px-8"
  >
    <form
      v-if="contactForm"
      @submit.prevent
      class="grid grid-cols-1 gap-4 text-white md:grid-cols-2"
      name="member"
    >
      <label>
        Förnamn:

        <input
          v-model="formData.firstname"
          name="firstname"
          type="text"
          required
        />
      </label>

      <label>
        Efternamn:

        <input
          v-model="formData.lastname"
          name="lastname"
          type="text"
          required
        />
      </label>

      <label>
        Email:

        <input v-model="formData.email" name="email" type="email" required />
      </label>

      <label>
        Telefon:

        <input v-model="formData.phone" name="phone" type="tel" required />
      </label>

      <label>
        Företag:

        <input v-model="formData.company" name="company" type="text" required />
      </label>

      <label class="col-span-1 md:col-span-2">
        Meddelande:

        <textarea v-model="formData.message" name="message" required />
      </label>

      <div class="hidden">
        <input name="clientip" type="text" v-model="formData.clientip" />
        <input name="pageuri" type="text" v-model="formData.pageuri" />
        <input name="pagename" type="text" v-model="formData.pagename" />
        <input name="amex" type="text" v-model="formData.amex" />
      </div>

      <div class="flex items-start pt-8">
        <button
          @click="sendForm"
          class="white"
          type="submit"
          data-wait="Vänta..."
        >
          {{ buttonText }}
        </button>
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
    const config = useRuntimeConfig();

    return {
      userName: config.public.userName,
      userPass: config.public.userPass,
      formData: {
        firstname: "",
        lastname: "",
        email: "",
        company: "",
        phone: "",
        message: "",
        clientip: "",
        pageuri: "",
        pagename: "",
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

  async mounted() {
    const res = await fetch("https://api.ipify.org?format=json");
    const ip = await res.json();
    this.formData.clientip = ip.ip;
    this.formData.pageuri = window.location.href;
    this.formData.pagename = document.title;
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
        let res = null;
        let error = null;

        try {
          res = await $fetch("/api/medlem", {
            method: "POST",
            headers: {
              Authorization:
                "Basic " + btoa(this.userName + ":" + this.userPass),
            },
            body: objectToFormData(this.formData),
          });

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
        } catch (err) {
          error = err;
          this.errorMessage = true;
        }
      } else {
        event.target.disabled = false;
      }
    },
  },
};
</script>
