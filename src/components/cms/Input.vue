<template>
  <input
    v-if="
      input.name !== 'index' &&
      getInputType(input.type) !== 'textarea' &&
      getInputType(input.type) !== 'file' &&
      getInputType(input.type) !== 'date' &&
      getInputType(input.type) !== 'checkbox' &&
      !isToFromType(input.name)
    "
    @click="handleInput"
    v-model="item[input.name]"
    :type="getInputType(input.type)"
    class="border border-white/25 bg-[#4a4644] p-2"
    :name="input.name"
  />
</template>

<script>
export default {
  name: "Input",

  props: {},

  data() {
    return {};
  },
};
</script>
