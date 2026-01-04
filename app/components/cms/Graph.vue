<template>
  <div>
    <div class="mb-12 flex gap-4">
      <label class="w-full font-semibold text-white/50 italic">
        Year:

        <select v-model="selectedYear">
          <option
            v-for="year in ['-', ...itemsYears]"
            :key="year"
            :value="year"
          >
            {{ year }}
          </option>
        </select>
      </label>

      <label class="w-full font-semibold text-white/50 italic">
        Month:

        <select v-model="selectedMonth">
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

    <Bar
      v-if="graphSettings?.type === 'bar'"
      :data="chartData"
      :options="graphSettings?.options ?? {}"
    />
    <Line
      v-else-if="graphSettings?.type === 'line'"
      :data="chartData"
      :options="graphSettings?.options ?? {}"
    />
    <Pie
      v-else-if="graphSettings?.type === 'pie'"
      :data="pieData"
      :options="graphSettings?.options ?? {}"
    />
  </div>
</template>

<script>
import { useCmsStore } from "~/components/cms/stores/cmsStore";
import { Bar, Line, Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

export default {
  name: "Graph",

  components: {
    Bar,
    Line,
    Pie,
  },

  props: {
    graphSettings: {
      type: Object,
      required: true,
    },
  },

  computed: {
    cmsStore() {
      return useCmsStore();
    },

    labels() {
      const config = this.graphSettings;
      if (!config) return [];

      const items = this.getFilteredItems;
      return [...new Set(items.map((item) => item[config.labelField]))].filter(
        Boolean,
      );
    },

    chartData() {
      const config = this.graphSettings;
      if (!config) return { labels: [], datasets: [] };

      const datasets = config.datasets.map((ds) => {
        let bgColor = ds.backgroundColor;
        let borderColor = ds.borderColor;

        return {
          label: ds.label,
          backgroundColor: bgColor,
          borderColor: borderColor,
          data: this.getChartValues(ds),
        };
      });

      return {
        labels: this.labels,
        datasets,
      };
    },

    pieData() {
      const config = this.graphSettings;
      if (!config) return { labels: [], datasets: [] };

      const datasets = config.datasets.map((ds) => {
        let bgColor = this.pieColors;
        let borderColor = "transparent";

        return {
          label: ds.label,
          backgroundColor: bgColor,
          borderColor: borderColor,
          data: this.getPieValues(),
        };
      });

      return {
        labels: this.pieLabels,
        datasets,
      };
    },

    getFilteredItems() {
      const items = this.cmsStore?.items ?? [];
      const startDate = new Date(
        this.selectedYear === "-" ? this.itemsYears[0] : this.selectedYear,
        this.pieLabels.indexOf(
          this.selectedMonth === "-" ? "January" : this.selectedMonth,
        ),
        1,
      );
      const endDate = new Date(
        this.selectedYear === "-"
          ? this.itemsYears[this.itemsYears.length - 1]
          : this.selectedYear,
        this.pieLabels.indexOf(
          this.selectedMonth === "-" ? "December" : this.selectedMonth,
        ) + 1,
        0,
        23,
        59,
        59,
      );

      return items.filter((item) => {
        const itemDate = new Date(item?.date?.[1]);
        return itemDate >= startDate && itemDate <= endDate;
      });
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

  methods: {
    getChartValues(datasetConfig) {
      const items = this.getFilteredItems;
      const config = this.graphSettings;

      return this.labels.map((label) => {
        const matching = items.filter(
          (item) => item[config.labelField] === label,
        );

        switch (datasetConfig.aggregation) {
          case "count":
            return matching.length;
          case "sum":
            return matching.reduce(
              (sum, item) => sum + (Number(item[datasetConfig.dataField]) || 0),
              0,
            );
          case "avg":
            return matching.length > 0
              ? matching.reduce(
                  (sum, item) =>
                    sum + (Number(item[datasetConfig.dataField]) || 0),
                  0,
                ) / matching.length
              : 0;
          default:
            return matching.length;
        }
      });
    },

    getPieValues() {
      const items = this.getFilteredItems;

      return this.pieLabels.map((label, monthIndex) => {
        const startDate = new Date(
          this.selectedYear === "-" ? this.itemsYears[0] : this.selectedYear,
          monthIndex,
          1,
        );
        const endDate = new Date(
          this.selectedYear === "-"
            ? this.itemsYears[this.itemsYears.length - 1]
            : this.selectedYear,
          monthIndex + 1,
          0,
          23,
          59,
          59,
        );

        const monthItems = items.filter((item) => {
          const itemDate = new Date(item?.date?.[1]);
          return itemDate >= startDate && itemDate <= endDate;
        });

        return monthItems.length;
      });
    },
  },

  data() {
    return {
      selectedYear: "-",
      selectedMonth: "-",
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
      pieColors: [
        "#7BA3E1",
        "#6BB89D",
        "#E6A968",
        "#D98080",
        "#A58BD0",
        "#D98BB8",
        "#69B8AD",
        "#E89A6B",
        "#8B8FD6",
        "#A9C76D",
        "#6BB8CA",
        "#B984D6",
      ],
    };
  },
};
</script>
