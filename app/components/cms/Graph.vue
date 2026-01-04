<template>
  <div>
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
      :data="chartData"
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

      const items = this.cmsStore.filteredSelectItems(config.dateField);

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

        if (config.type === "pie") {
          const numColors = this.labels.length;
          bgColor = this.getDistinctColors(numColors);
          borderColor = this.getDistinctColors(numColors, true);
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
    getChartValues(datasetConfig) {
      const config = this.graphSettings;
      const items = this.cmsStore.filteredSelectItems(config.dateField);

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

    getDistinctColors(count, darker = false) {
      const colors = [];
      const startHue = 0;
      const endHue = 60;
      const saturation = 100;
      const lightness = darker ? 67 : 70;

      for (let i = 0; i < count; i++) {
        const progress = i / Math.max(count - 1, 1);
        const pingPong = progress <= 0.5 ? progress * 2 : (1 - progress) * 2;

        const hue = startHue + pingPong * (endHue - startHue);
        colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
      }

      return colors;
    },
  },
};
</script>
