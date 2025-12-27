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
    <Pie
      v-else-if="graphSettings && graphSettings.type === 'pie'"
      :data="chartData"
      :options="chartOptions"
    />
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

    chartData() {
      const config = this.graphSettings;
      if (!config) return { labels: [], datasets: [] };

      const isPieOrDoughnut = ["pie", "doughnut"].includes(config.type);

      const datasets = config.datasets.map((ds) => {
        let bgColor = ds.backgroundColor;
        let borderColor = ds.borderColor;

        if (isPieOrDoughnut && !Array.isArray(bgColor)) {
          bgColor = this.generateColors(this.labels.length);
          borderColor = "transparent";
        }

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
  },

  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: true,
      },
    };
  },
};
</script>
