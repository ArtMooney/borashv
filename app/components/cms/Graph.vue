<template>
  <div>
    <Bar
      v-if="graphSettings && graphSettings.type === 'bar'"
      :data="chartData"
      :options="chartOptions"
    />
    <Line
      v-else-if="graphSettings && graphSettings.type === 'line'"
      :data="chartData"
      :options="chartOptions"
    />

    <Pie :data="pieData" :options="chartOptions" class="mt-12" />
  </div>
</template>

<script>
import { useCmsStore } from "~/components/cms/stores/cmsStore";
import { graphConfig } from "~/../server/db/schema";
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

  computed: {
    cmsStore() {
      return useCmsStore();
    },

    graphSettings() {
      const tableId = this.cmsStore.tableId;
      return graphConfig[tableId] ?? null;
    },

    labels() {
      const config = this.graphSettings;
      if (!config) return [];

      const items = this.cmsStore?.items ?? [];
      return [...new Set(items.map((item) => item[config.labelField]))].filter(
        Boolean,
      );
    },

    pieLabels() {
      return [
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
      ];
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
        let bgColor = this.generateColors(this.labels.length);
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
  },

  methods: {
    generateColors(count) {
      const colors = [];
      for (let i = 0; i < count; i++) {
        const hue = (i * 360) / count;
        colors.push(`hsl(${hue}, 70%, 60%)`);
      }

      return colors;
    },

    getChartValues(datasetConfig) {
      const items = this.cmsStore?.items ?? [];
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
      const items = this.cmsStore?.items ?? [];

      return this.pieLabels.map((label, monthIndex) => {
        const startDate = new Date(this.selectedYear, monthIndex, 1);
        const endDate = new Date(
          this.selectedYear,
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
      selectedYear: new Date("2025-01-01").getFullYear(),
      chartOptions: {
        responsive: true,
        maintainAspectRatio: true,
      },
    };
  },
};
</script>
