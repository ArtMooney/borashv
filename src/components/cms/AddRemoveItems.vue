<template>
  <div
    class="mx-auto mt-8 flex max-w-screen-md select-none flex-wrap justify-center gap-4 text-base"
  >
    <div>Add, edit or remove content below</div>

    <div class="flex w-full justify-between">
      <div
        @click="addItem()"
        class="cursor-pointer rounded border border-white/25 bg-[#548b63] px-2 py-1 text-sm hover:bg-[#6bad7d]"
      >
        + Add new item
      </div>

      <div class="relative flex text-sm">
        <div
          @click="showDateList = !showDateList"
          class="cursor-pointer rounded border border-white/25 bg-[#534d75] px-2 py-1 hover:bg-[#5f587f]"
        >
          Sort list by date
        </div>

        <div
          v-if="showDateList"
          class="absolute right-0 top-0 z-10 mt-8 min-w-56 rounded bg-black p-4"
        >
          <div class="mb-2 justify-self-end">Choose date field</div>

          <div v-if="getDateList.length < 1" class="w-full text-right">
            No date fields
          </div>
          <div
            v-for="date of getDateList"
            @click="sortDateField"
            class="w-full cursor-pointer text-right hover:bg-white/25"
          >
            {{ date.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddRemoveItems",

  props: {
    schema: {
      type: Array,
      required: false,
      default: [],
    },
  },

  data() {
    return {
      showDateList: false,
    };
  },

  computed: {
    getDateList() {
      return [{ name: "datum" }];
    },
  },

  mounted() {},

  methods: {
    addItem() {},

    sortDateField() {},
  },
};
</script>
