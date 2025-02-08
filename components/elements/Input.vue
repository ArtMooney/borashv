<template>
  <div>
    <label v-if="labelText" class="text-white" :for="name">{{
      labelText
    }}</label>

    <input
      v-if="type !== 'message'"
      class="m-0 w-full rounded border border-solid border-white/25 bg-neutral-600 px-4 py-2 text-sm placeholder:text-neutral-500"
      maxlength="256"
      :name="name"
      :type="type"
      :placeholder="placeholderText"
      :required="required"
      :value="modelValue"
      @input="$emit('updateValue', $event.target.value)"
    />

    <textarea
      v-if="type === 'message'"
      class="m-0 min-h-28 w-full rounded border border-solid border-white/25 bg-neutral-600 px-4 py-2 text-sm placeholder:text-neutral-500"
      maxlength="5000"
      :name="name"
      :placeholder="placeholderText"
      :required="required"
      :value="modelValue"
      @input="$emit('updateValue', $event.target.value)"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: "Input",

  props: {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    placeholderText: {
      type: String,
      default: "",
      required: false,
    },
    required: {
      type: Boolean,
      default: false,
      required: false,
    },
    labelText: {
      type: String,
      required: false,
    },
    modelValue: {
      type: String,
      required: false,
    },
  },

  emits: ["updateValue"],
};
</script>
