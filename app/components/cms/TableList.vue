<template>
  <div
    class="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-4 text-base"
  >
    <label class="flex w-full flex-col gap-2">
      <p class="font-semibold text-white/50 italic">
        Choose content table to edit
      </p>

      <select v-model="tableIndex">
        <option v-for="(table, index) of cmsStore.tables" :value="index">
          {{ table.name }}
        </option>
      </select>
    </label>
  </div>
</template>

<script>
import { useCmsStore } from "~/components/cms/stores/cmsStore";

export default {
  name: "TableList",

  data() {
    return {
      tableIndex: 0,
    };
  },

  computed: {
    cmsStore() {
      return useCmsStore();
    },
  },

  async mounted() {
    await this.cmsStore.loadTables();
    await this.loadSchema();
  },

  methods: {
    async loadSchema() {
      const table = this.cmsStore.tables[this.tableIndex];
      this.cmsStore.tableId = table.id;
      this.cmsStore.viewMode = table.viewMode;
      this.cmsStore.backupRef = table.backupRef;

      await this.cmsStore.loadFields();

      if (this.cmsStore.backupRef !== null) {
        this.cmsStore.tableId = this.cmsStore.backupRef;
        await this.cmsStore.loadRows("asc", "sortOrder");

        const backupItems = [];
        for (const item of this.cmsStore.items) {
          if (item?.date?.[1] && new Date(item.date[1]) < new Date()) {
            backupItems.push(item);
          }
        }

        this.cmsStore.tableId = table.id;
        this.cmsStore.items = backupItems;
        await this.cmsStore.addItems();

        this.cmsStore.tableId = this.cmsStore.backupRef;
        await this.cmsStore.deleteAllItems();
      }

      await this.cmsStore.loadRows("asc", "sortOrder");

      // if (this.cmsStore.viewMode === "graph") {
      // console.log("VIEWMODE", this.cmsStore.viewMode);
      // }
    },
  },

  watch: {
    async tableIndex() {
      await this.loadSchema();
    },
  },
};
</script>
