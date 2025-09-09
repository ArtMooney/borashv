<script setup>
import IconIonChevronDown from "~icons/ion/chevron-down";
</script>

<template>
  <div
    class="lg:max-w-auto relative w-56 max-w-56 cursor-pointer lg:w-auto"
    @click="isClicked = !isClicked"
    @mouseenter="isHover = true"
    @mouseleave="closeDropdown"
  >
    <div class="flex items-center gap-1">
      {{ text }}
      <IconIonChevronDown
        class="-mr-1.5 h-5 w-5 lg:h-4 lg:w-4"
      ></IconIonChevronDown>
    </div>

    <div class="relative">
      <div
        class="min-w-full flex-col gap-3 pt-4 pr-4 pb-4 text-sm uppercase lg:absolute lg:top-0 lg:left-0 lg:bg-[#25322b]/75 lg:p-4 lg:pl-2"
        :class="[isClicked ? 'flex' : isHover ? 'hidden lg:flex' : 'hidden']"
      >
        <component
          :is="item.isExternal ? 'a' : 'router-link'"
          v-for="item in list"
          :to="!item.isExternal ? item.link : undefined"
          :href="item.isExternal ? item.link : undefined"
          :target="item.openInNewTab ? '_blank' : '_self'"
          class="pl-2 whitespace-nowrap hover:opacity-75 lg:pl-0"
          @click="$emit('button-clicked')"
        >
          {{ item.text }}
        </component>
      </div>
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
    isMobile: {
      type: Boolean,
      required: false,
    },
  },

  data() {
    return {
      isClicked: false,
      isHover: false,
    };
  },

  methods: {
    closeDropdown() {
      if (!this.isMobile) {
        this.isClicked = false;
        this.isHover = false;
      }
    },
  },

  watch: {
    isMobile() {
      if (!this.isMobile) {
        this.isClicked = false;
        this.isHover = false;
      }
    },
  },
};
</script>
