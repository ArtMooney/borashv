<template>
  <div
    class="mx-auto mt-8 flex max-w-screen-md flex-wrap justify-center gap-4 text-base"
  >
    <label class="flex w-full flex-col gap-2">
      <p class="font-semibold text-white/50 italic">
        Choose content table to edit
      </p>

      <select v-model="tableIndex">
        <option v-for="(table, index) of tables" :value="index">
          {{ table.name }}
        </option>
      </select>
    </label>
  </div>
</template>

<script>
import { useLoginStore } from "~/components/cms/stores/loginStore";

export default {
  name: "TableList",

  data() {
    const config = useRuntimeConfig();

    return {
      userName: config.public.userName,
      userPass: config.public.userPass,
      tableIndex: 0,
      tables: [],
    };
  },

  computed: {
    loginStore() {
      return useLoginStore();
    },
  },

  async mounted() {
    this.$emit("loadingFlag", true);

    this.tables = await this.listTables();
    const schema = await this.listFields(this.tables[this.tableIndex].id);

    this.$emit("schema", schema);
    this.$emit("tableId", this.tables[this.tableIndex].id);
    this.$emit("tableType", this.tables[this.tableIndex].tableType);
  },

  methods: {
    async listTables() {
      try {
        return await $fetch("/cms/tables", {
          method: "POST",
          headers: {
            Authorization: "Basic " + btoa(this.userName + ":" + this.userPass),
          },
          body: JSON.stringify({
            email: this.loginStore.email,
            password: this.loginStore.password,
          }),
        });
      } catch (err) {
        if (err.status === 401) {
          this.loginStore.logout();
          location.reload();
        }
      }
    },

    async listFields(tableid) {
      try {
        return await $fetch("/cms/fields", {
          method: "POST",
          headers: {
            Authorization: "Basic " + btoa(this.userName + ":" + this.userPass),
          },
          body: JSON.stringify({
            email: this.loginStore.email,
            password: this.loginStore.password,
            table_id: tableid,
          }),
        });
      } catch (err) {
        if (err.status === 401) {
          this.loginStore.logout();
          location.reload();
        }
      }
    },
  },

  watch: {
    async tableIndex() {
      this.$emit("loadingFlag", true);
      const schema = await this.listFields(this.tables[this.tableIndex].id);
      this.$emit("schema", schema);
      this.$emit("tableId", this.tables[this.tableIndex].id);
      this.$emit("tableType", this.tables[this.tableIndex].tableType);
    },
  },
};
</script>
