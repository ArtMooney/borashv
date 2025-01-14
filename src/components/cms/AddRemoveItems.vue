<template>
  <div
    class="mx-auto mt-8 flex max-w-screen-md flex-wrap justify-center gap-4 text-base"
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
          @click.stop="sortItems"
          class="cursor-pointer rounded border border-white/25 bg-[#534d75] px-2 py-1 hover:bg-[#5f587f]"
        >
          Sort list by date
        </div>

        <div
          v-if="showDateList"
          class="absolute right-0 top-0 mt-8 min-w-56 rounded bg-black p-4"
        >
          <div class="mb-2 justify-self-end">Choose date field</div>

          <div v-if="getDateList().length < 1" class="w-full text-right">
            No date fields
          </div>
          <div
            v-for="date of getDateList()"
            @click="sortDateField"
            class="w-full cursor-pointer text-right hover:bg-white/25"
          >
            {{ date.name.includes("|") ? date.name.split("|")[0] : date.name }}
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
    tables: {
      type: Array,
      required: false,
      default: [],
    },
    tableIndex: {
      type: Number,
      required: false,
      default: 0,
    },
    saveFlag: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data() {
    return {
      showDateList: false,
    };
  },

  methods: {
    addItem() {
      //   if (this.saveFlag) {
      //     this.alertSaveFlag();
      //     return;
      //   }

      this.$emit("editingNewItem", true);
      const index = this.localItems.length;
      this.currentIndex = index;
      let fields = {};

      for (const item of this.schema[this.schemaIndex].fields) {
        if (item.type === "boolean") {
          fields[item.name] = false;
        } else if (item.type === "file") {
          fields[item.name] = [];
        } else {
          fields[item.name] = "";
        }
      }

      fields.index = index;

      this.localItems.push({
        ...fields,
        id: "",
      });

      this.showItem = this.showItem === index ? false : index;

      this.$nextTick(() => {
        this.saveFlag = true;
        const element = this.$refs["list-item-" + this.showItem].$el;
        const inputs = element.querySelectorAll("input");

        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        inputs[0].focus();
      });
    },

    sortItems() {
      // if (this.saveFlag) {
      //   this.alertSaveFlag();
      //   return;
      // }

      this.showDateList = !this.showDateList;
    },

    getDateList() {
      const dateList = [];

      for (const table of this.tables[this.tableIndex].fields) {
        if (table.type === "date") {
          dateList.push(table);
        }

        if (table.name.includes("|") && table.name.includes("to-from")) {
          dateList.push(table);
        }
      }

      return dateList;
    },

    sortDateField(event) {
      // const sortedItems = [];
      // const sortedItemNulls = [];
      // let sortName = event.target.innerText;
      //
      // // assure that we have the full name if special date format
      // for (const item of this.schema[this.schemaIndex].fields) {
      //   if (`${sortName}|to-from` === item.name) {
      //     sortName = item.name;
      //   }
      // }
      //
      // for (const item of this.localItems) {
      //   if (item[sortName]) {
      //     sortedItems.push(item);
      //   } else {
      //     sortedItemNulls.push(item);
      //   }
      // }
      //
      // if (!this.sortOrder) {
      //   this.sortOrder = true;
      //
      //   sortedItems.sort((a, b) => {
      //     const dateA =
      //       typeof a[sortName] === "object"
      //         ? new Date(a[sortName][0])
      //         : new Date(a[sortName]);
      //     const dateB =
      //       typeof b[sortName] === "object"
      //         ? new Date(b[sortName][0])
      //         : new Date(b[sortName]);
      //
      //     return dateA - dateB; // Ascending order
      //   });
      // } else {
      //   this.sortOrder = false;
      //
      //   sortedItems.sort((a, b) => {
      //     const dateA =
      //       typeof a[sortName] === "object"
      //         ? new Date(a[sortName][0])
      //         : new Date(a[sortName]);
      //     const dateB =
      //       typeof b[sortName] === "object"
      //         ? new Date(b[sortName][0])
      //         : new Date(b[sortName]);
      //
      //     return dateB - dateA; // Descending order
      //   });
      // }
      //
      // const allItems = sortedItems.concat(sortedItemNulls);
      // const newList = [];
      // let numberNulls = 0;
      //
      // // pair them based on the index and with the nulls (undated objects) always in their original place
      // for (const [index, all] of Object.entries(allItems)) {
      //   let isNull = false;
      //
      //   for (const nullItem of sortedItemNulls) {
      //     if (parseInt(nullItem.index) === parseInt(index)) {
      //       newList.push(nullItem);
      //       isNull = true;
      //       numberNulls = numberNulls + 1;
      //     }
      //   }
      //
      //   if (!isNull) {
      //     newList.push(sortedItems[parseInt(index - numberNulls)]);
      //   }
      // }
      //
      // this.localItems = JSON.parse(JSON.stringify(newList));
      // this.showDateList = false;
      // this.saveAllItems();
    },
  },
};
</script>
