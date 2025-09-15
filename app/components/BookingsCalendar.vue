<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
</script>

<template>
  <div id="bokningslista" class="grid grid-cols-1 gap-2 px-4 py-12 md:px-8">
    <h4 class="text-3xl uppercase">Bokningskalender</h4>

    <VueDatePicker
      v-model="selectedDate"
      :format="'yyyy-MM-dd'"
      locale="sv"
      auto-apply
      inline
      dark
      :markers="markers"
    />
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

  data() {
    return {
      selectedDate: new Date(),
      markers: [
        {
          date: "2025-09-10",
          type: "line",
          color: "blue",
          tooltip: [{ text: "First tooltip", color: "blue" }],
        },
        {
          date: "2025-09-11",
          type: "line",
          color: "green",
          tooltip: [{ text: "First tooltip", color: "blue" }],
        },
      ],
    };
  },

  mounted() {
    // console.log(this.items);
  },
};
</script>
