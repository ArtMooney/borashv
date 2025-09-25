<template>
  <div
    id="bookings-form"
    class="mx-auto grid w-full max-w-screen-xl grow grid-cols-1 content-center px-4 py-12 md:px-8"
  >
    <form
      v-if="contactForm"
      @submit.prevent
      class="grid grid-cols-1 gap-4 text-white md:grid-cols-2"
      name="member"
    >
      <label>
        Företag / Organisation: *

        <input v-model="formData.company" name="company" type="text" required />
      </label>

      <label>
        Kontaktperson: *

        <input v-model="formData.name" name="name" type="text" required />
      </label>

      <label>
        Telefon: *

        <input v-model="formData.phone" name="phone" type="tel" required />
      </label>

      <label>
        Email: *

        <input v-model="formData.email" name="email" type="email" required />
      </label>

      <label>
        Typ av verksamhet (t.ex. styrelsemöte): *

        <input
          v-model="formData.eventType"
          name="eventType"
          type="text"
          required
        />
      </label>

      <label>
        Bokning avser följande lokal(er): *

        <select v-model="formData.venue">
          <option v-for="venue of venues" :value="venue">
            {{ venue }}
          </option>
        </select>
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
  name: "BookingsForm",

  data() {
    const config = useRuntimeConfig();

    return {
      userName: config.public.userName,
      userPass: config.public.userPass,
      formData: {
        company: "",
        name: "",
        phone: "",
        email: "",
        eventType: "",
        venue: "",
        clientip: "",
        pageuri: "",
        pagename: "",
        amex: "",
      },
      venues: [
        "Konferensrum",
        "Samlingssal",
        "Mäss",
        "Övervåning vänster (logement 1)",
        "Övervåning höger (logement 2)",
      ],
      buttonText: "Skicka ansökan",
      defaultEmailMessage: "Något gick fel när formuläret skulle skickas.",
      emailSuccessMessage: `Ert meddelande har skickats! Om er bokning godkänns kommer ni att få en bekräftelse på mail.`,
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
          res = await $fetch("/api/boka-lokal", {
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
              hash: "#bookings-form",
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
