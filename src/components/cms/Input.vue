<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { IonIcon } from "@ionic/vue";
import { closeCircleOutline } from "ionicons/icons";
</script>

<template>
  <input
    v-if="
      input.name !== 'index' &&
      getInputType(input.type) !== 'textarea' &&
      getInputType(input.type) !== 'file' &&
      getInputType(input.type) !== 'date' &&
      !isToFromType(input.name)
    "
    @click.stop
    v-model="item[input.name]"
    :type="getInputType(input.type)"
    :class="[
      getInputType(input.type) === 'checkbox'
        ? 'h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
        : 'border border-white/25 bg-[#4a4644] p-2',
    ]"
    :name="input.name"
  />

  <VueDatePicker
    v-if="
      input.name !== 'index' &&
      (getInputType(input.type) === 'date' || isToFromType(input.name))
    "
    v-model="item[input.name]"
    :format="'yyyy-mm-dd'"
    locale="sv"
    auto-apply=""
    :name="input.name"
    :range="isToFromType(input.name)"
    @cleared="datePickerCleared"
  >
  </VueDatePicker>

  <textarea
    v-if="input.name !== 'index' && getInputType(input.type) === 'textarea'"
    @click.stop
    v-model="item[input.name]"
    class="h-40 border border-white/25 bg-[#4a4644] p-2"
    :name="input.name"
  ></textarea>

  <div
    v-if="input.name !== 'index' && getInputType(input.type) === 'file'"
    class="flex gap-1 justify-self-start"
  >
    <input
      v-if="input.name !== 'index' && getInputType(input.type) === 'file'"
      @click.stop
      @change="handleFileInput($event, input.name, item)"
      :id="`${input.name}-${index}`"
      :ref="`${input.name}-${index}`"
      class="hidden"
      :type="getInputType(input.type)"
      :name="`${input.name}`"
      accept=".jpg, .jpeg, .png"
    />

    <label
      @click.stop
      :for="`${input.name}-${index}`"
      class="cursor-pointer text-sm text-white underline"
    >
      {{ displayFilename(item[input.name]) }}
    </label>

    <ion-icon
      @click.stop="
        removeFile(item, index, `${input.name}-${index}`, input.name)
      "
      :icon="closeCircleOutline"
      class="h-4 w-4 cursor-pointer px-0.5 text-red-600"
    ></ion-icon>
  </div>
</template>

<script>
export default {
  name: "Input",

  emits: ["showItem", "saveFlag"],

  props: {
    input: {
      type: Object,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },

  methods: {
    getInputType(type) {
      let inputType = "text";

      if (type === "long_text") {
        inputType = "textarea";
      } else if (type === "date") {
        inputType = "date";
      } else if (type === "boolean") {
        inputType = "checkbox";
      } else if (type === "file") {
        inputType = "file";
      }

      return inputType;
    },

    isToFromType(inputName) {
      return !!(
        inputName.includes("|") && inputName.split("|")[1] === "to-from"
      );
    },

    datePickerCleared(value) {
      if (!value) {
      }
    },

    async handleFileInput(event, name, inputFields) {
      if (!event.target.files[0].name) return;

      inputFields[name] = [
        {
          name: event.target.files[0].name,
          file: await this.readEncodeFiles(event.target.files),
        },
      ];
    },

    readEncodeFiles(files) {
      return new Promise((resolve, reject) => {
        if (files.length > 0) {
          let selectedFile = files[0];
          let reader = new FileReader();

          reader.onload = function (e) {
            let base64Data = e.target.result.split(",")[1];
            resolve(base64Data);
          };

          reader.onerror = function (error) {
            reject(error);
          };

          // Read the file as a data URL, which will be Base64-encoded
          reader.readAsDataURL(selectedFile);
        } else {
          reject(new Error("No files to process."));
        }
      });
    },

    displayFilename(filename) {
      if (filename && filename.length > 0) {
        if (filename[0].visible_name) {
          return filename[0].visible_name;
        } else if (filename[0].name) {
          return filename[0].name;
        }
      }

      return "Click here to choose an image.";
    },

    removeFile(item, index, inputName, fieldName) {
      this.$refs[inputName].value = "";
      this.item[fieldName] = [];
    },
  },
};
</script>

<style>
.dp__menu {
  background: #e6e6e6 !important;
  font-size: 14px !important;
}

.dp__input {
  background: #4a4644 !important;
  font-size: 14px !important;
  border: 1px solid rgba(255, 255, 255, 0.25) !important;
  border-radius: 0 !important;
  color: white !important;
}

.dp__cell_inner {
  font-size: 12px !important;
}

.dp__month_year_select {
  font-size: 16px !important;
}
</style>
