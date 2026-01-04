<template>
  <div class="mb-12 flex gap-4">
    <label class="w-full font-semibold text-white/50 italic">
      Year:

      <select v-model="cmsStore.selectedYear">
        <option v-for="year in ['-', ...itemsYears]" :key="year" :value="year">
          {{ year }}
        </option>
      </select>
    </label>

    <label class="w-full font-semibold text-white/50 italic">
      Month:

      <select v-model="cmsStore.selectedMonth">
        <option
          v-for="month in ['-', ...pieLabels]"
          :key="month"
          :value="month"
        >
          {{ month }}
        </option>
      </select>
    </label>
  </div>
</template>

<script>
import { useCmsStore } from "~/components/cms/stores/cmsStore";

export default {
  name: "GraphSelectors",

  computed: {
    cmsStore() {
      return useCmsStore();
    },

    itemsYears() {
      const items = this.cmsStore?.items ?? [];
      return [
        ...new Set(
          items.map((item) => new Date(item?.date?.[0]).getFullYear()),
        ),
      ].sort();
    },
  },

  data() {
    return {
      pieLabels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
  },
};
</script>
