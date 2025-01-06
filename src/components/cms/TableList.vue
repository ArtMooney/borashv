<template>
  <div
    class="mx-auto mt-8 flex max-w-screen-md flex-wrap justify-center gap-4 text-base"
  >
    <div v-for="(table, index) of tables">
      <div
        @click="tableIndex = index"
        :class="[
          tableIndex === index
            ? 'cursor-pointer border-b-2 border-white hover:bg-gradient-to-r hover:from-[#ff6363] hover:via-[#b776e5] hover:to-white hover:bg-clip-text hover:text-transparent'
            : 'cursor-pointer hover:bg-gradient-to-r hover:from-[#ff6363] hover:via-[#b776e5] hover:to-white hover:bg-clip-text hover:text-transparent',
        ]"
      >
        {{ table.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TableList",

  props: {
    tables: {
      type: Array,
      required: false,
      default: [],
    },
  },

  data() {
    return {
      tableIndex: 0,
    };
  },

  watch: {
    tableIndex() {
      this.$emit("tableIndex", this.tableIndex);
    },
  },
};
</script>
