<script setup>
import { IonIcon } from "@ionic/vue";
import { chevronDown } from "ionicons/icons";
</script>

<template>
  <div
    class="flex items-center gap-1 -mr-0 relative"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    {{ text }}
    <ion-icon :icon="chevronDown" class="w-4 h-4"></ion-icon>

    <div
      class="absolute top-0 left-0 pr-4 pb-4 pt-8 flex-col text-sm gap-3 uppercase min-w-full"
      :class="[isHover ? 'flex' : 'hidden']"
    >
      <a v-for="item in list" :href="item.link">
        {{ item.text }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavbarDropdown",

  props: {
    text: {
      type: String,
      required: true,
    },
    list: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      isHover: false,
    };
  },
};
</script>
