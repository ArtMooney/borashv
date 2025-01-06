<script setup>
import { IonIcon } from "@ionic/vue";
import { home, cog } from "ionicons/icons";
</script>

<template>
  <div
    class="mx-auto mt-8 flex max-w-screen-md flex-wrap justify-center gap-4 text-base"
  >
    <div v-for="(table, index) of schema">
      <div
        @click="schemaIndex = index"
        :class="[
          schemaIndex === index
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

  data() {
    return {
      schema: [
        { name: "jkshbdjahs" },
        { name: "jkshbdjahs" },
        { name: "jkshbdjahs" },
      ],
      schemaIndex: 0,
    };
  },

  methods: {},
};
</script>
