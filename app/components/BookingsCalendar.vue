<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
</script>

<template>
  <div id="bokningslista" class="grid grid-cols-1 gap-2 px-4 py-12 md:px-8">
    <h4 class="text-3xl uppercase">Bokningskalender</h4>

    <VueDatePicker
      :format="'yyyy-MM-dd'"
      locale="sv"
      auto-apply=""
      inline
      dark
      :class="[
        '[&_div]:!font-body',
        '[&_button]:!p-0',
        '[&_div]:!text-xs',
        '[&_input]:!border-white/25',
        '[&_input]:!bg-transparent',
        '[&_input]:!py-3 [&_input]:!text-sm',
        '[&_input]:!text-sm',
        '[&_input]:!text-white',
      ]"
    >
    </VueDatePicker>
  </div>
</template>

<script>
export default {
  name: "Bokningskalender",

  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },

  mounted() {
    console.log(this.items);
  },

  methods: {
    displayToFromDate(date) {
      if (!date) return;
      date = JSON.parse(date);
      if (date) {
        if (date[0] === date[1]) {
          // output only first
          return this.formatDate(date[0]);
        } else {
          // output both
          return `${this.formatDate(date[0])} - ${this.formatDate(date[1])}`;
        }
      }

      return "";
    },

    formatDate(date) {
      let dateObj = new Date(date);
      let day = dateObj.getDate();
      let months = [
        "Januari",
        "Februari",
        "Mars",
        "April",
        "Maj",
        "Juni",
        "Juli",
        "Augusti",
        "September",
        "Oktober",
        "November",
        "December",
      ];
      let month = months[dateObj.getMonth()];
      let year = dateObj.getFullYear();

      return `${day} ${month} ${year}`;
    },
  },
};
</script>
