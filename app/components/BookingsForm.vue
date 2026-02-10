<script setup>
import { VueDatePicker } from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import sv from "date-fns/locale/sv";
</script>

<template>
  <div
    id="bookings-form"
    class="mx-auto w-full max-w-7xl grow content-center px-4 py-12 md:px-8"
  >
    <form
      v-if="contactForm"
      @submit.prevent
      class="grid gap-4 text-white md:grid-cols-2"
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
        Välj datum och tid:

        <VueDatePicker
          v-model="formData.dateRange"
          :formats="{ input: 'yyyy-MM-dd' }"
          :locale="sv"
          auto-apply
          range
          :input-attrs="{ name: 'date-range', required: true }"
          :time-config="{ timePickerInline: true }"
          :class="[
            '[&_div]:font-body! [&_div]:text-xs!',
            '[&_input]:font-body! [&_input]:my-1! [&_input]:border-0! [&_input]:py-3.5! [&_input]:text-sm! [&_input]:outline!',
            !dateRangeValid
              ? '[&_input]:bg-rose-100! [&_input]:text-rose-700 [&_input]:outline-rose-700!'
              : '[&_input]:bg-neutral-700! [&_input]:text-white! [&_input]:outline-white/35!',
            '[&_button]:p-0!',
            '[&>div:not(:first-child)>div]:pb-4!',
          ]"
        >
        </VueDatePicker>

        <span class="mt-1 text-xs text-rose-400">{{
          alreadyBooked ? "Datum är redan bokat" : ""
        }}</span>
      </label>

      <div>
        <div class="mb-4">Bokning avser följande lokal(er): *</div>

        <div v-for="(venue, index) in venues" :key="venue" class="flex gap-2">
          <input
            type="checkbox"
            :id="'venue-' + index"
            v-model="formData.venue"
            :value="venue"
          />

          <label
            :for="'venue-' + index"
            class="m-0 cursor-pointer select-none"
            >{{ venue }}</label
          >
        </div>
      </div>

      <div class="hidden">
        <input name="clientip" type="text" v-model="formData.clientip" />
        <input name="pageuri" type="text" v-model="formData.pageuri" />
        <input name="pagename" type="text" v-model="formData.pagename" />
        <input name="amex" type="text" v-model="formData.amex" />
      </div>

      <div class="flex items-start pt-8 md:col-span-2">
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

  props: {
    items: {
      type: Array,
      required: true,
    },
  },

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
        venue: [],
        dateRange: "",
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
      contactForm: false,
      successMessage: false,
      errorMessage: false,
      dateRangeValid: true,
      alreadyBooked: false,
    };
  },

  async mounted() {
    await this.loginHandler();

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
        emailValidator(event.target.form) &&
        this.dateRangeValid
      ) {
        try {
          await $fetch("/api/boka-lokal", {
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
          this.errorMessage = true;
        }
      } else {
        event.target.disabled = false;
      }
    },

    async loginHandler() {
      const route = useRoute();
      const validation = route.query.validation;
      const action = route.query.action;

      if (validation) {
        this.contactForm = false;

        try {
          const res = await $fetch("/api/boka-validering", {
            method: "POST",
            headers: {
              Authorization:
                "Basic " + btoa(this.userName + ":" + this.userPass),
            },
            body: JSON.stringify({
              "booking-validation": validation,
              action,
            }),
          });

          setTimeout(() => {
            this.contactForm = false;
            this.emailSuccessMessage = !action
              ? "Valideringen godkänd"
              : "Valideringen nekad";
            this.successMessage = true;

            this.$router.push({
              hash: "#bookings-form",
            });
          }, 100);
        } catch (err) {
          setTimeout(() => {
            this.contactForm = false;
            this.emailSuccessMessage = "Något gick fel vid validering";
            this.successMessage = true;

            this.$router.push({
              hash: "#bookings-form",
            });
          }, 100);
        }
      } else {
        this.contactForm = true;
      }
    },
  },

  watch: {
    "formData.dateRange"() {
      if (!this.formData.dateRange || this.formData.dateRange === "") {
        this.dateRangeValid = true;
        this.alreadyBooked = false;
        return;
      }

      for (const date of this.formData.dateRange) {
        if (!date) {
          this.dateRangeValid = false;
          return;
        }
      }

      const selectedStart = new Date(this.formData.dateRange[0]);
      const selectedEnd = new Date(this.formData.dateRange[1]);

      for (const item of this.items) {
        if (!item.date[0] || !item.date[1]) continue;

        const bookedStart = new Date(item.date[0]);
        const bookedEnd = new Date(item.date[1]);

        if (selectedStart <= bookedEnd && selectedEnd >= bookedStart) {
          this.dateRangeValid = false;
          this.alreadyBooked = true;
          return;
        }
      }

      this.dateRangeValid = true;
      this.alreadyBooked = false;
    },
  },
};
</script>
