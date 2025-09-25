<template>
  <div
    id="contact"
    class="col-span-1 mx-auto grid w-full max-w-screen-xl grow content-center items-center gap-8 px-4 py-12 md:px-8 lg:grid-cols-5"
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
        <input
          v-model="formData.email"
          name="email"
          type="email"
          placeholder="Email"
          required
          class="col-span-2"
        />

        <div class="hidden">
          <input name="clientip" type="text" v-model="formData.clientip" />
          <input name="pageuri" type="text" v-model="formData.pageuri" />
          <input name="pagename" type="text" v-model="formData.pagename" />
          <input name="amex" type="text" v-model="formData.amex" />
        </div>

        <button
          @click="sendForm"
          type="submit"
          data-wait="Vänta..."
          class="white"
        >
          {{ buttonText }}
        </button>
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
    const config = useRuntimeConfig();

    return {
      userName: config.public.userName,
      userPass: config.public.userPass,
      formData: {
        email: "",
        clientip: "",
        pageuri: "",
        pagename: "",
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

      if (
        requiredFields(event.target.form) &&
        emailValidator(event.target.form)
      ) {
        let res = null;
        let error = null;

        try {
          res = await $fetch("/api/kontakt", {
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
              hash: "#contact",
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
