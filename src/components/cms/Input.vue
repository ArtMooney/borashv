<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import xmark from "../../assets/xmark.vue";
import { IonIcon } from "@ionic/vue";
import { home, cog } from "ionicons/icons";
</script>

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

  <input
    v-if="input.name !== 'index' && getInputType(input.type) === 'checkbox'"
    @click="handleInput"
    type="checkbox"
    class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
    v-model="item[input.name]"
    :name="input.name"
  />

  <VueDatePicker
    v-if="
      input.name !== 'index' &&
      (getInputType(input.type) === 'date' || isToFromType(input.name))
    "
    v-model="item[input.name]"
    :format="'yyyy-MM-dd'"
    locale="sv"
    auto-apply=""
    :name="input.name"
    :range="isToFromType(input.name)"
    @cleared="datePickerCleared"
  >
  </VueDatePicker>

  <textarea
    v-if="input.name !== 'index' && getInputType(input.type) === 'textarea'"
    @click="handleInput"
    v-model="item[input.name]"
    :type="getInputType(input.type)"
    class="cms-input message w-input"
    :name="input.name"
  ></textarea>

  <div
    v-if="input.name !== 'index' && getInputType(input.type) === 'file'"
    id="w-node-_59be39db-3067-b4db-62e1-04f78c919737-d10df2f5"
    class="filename-wrapper"
  >
    <input
      v-if="input.name !== 'index' && getInputType(input.type) === 'file'"
      @click="handleInput"
      @change="handleFileInput($event, input.name, item)"
      :id="`${input.name}-${index}`"
      :ref="`${input.name}-${index}`"
      class="hide1"
      :type="getInputType(input.type)"
      :name="`${input.name}`"
      accept=".jpg, .jpeg, .png"
    />

    <label
      @click="handleInput"
      :for="`${input.name}-${index}`"
      class="text-s linkstyle"
    >
      {{ displayFilename(item[input.name]) }}
    </label>

    <xmark
      @click.stop="removeFile(index, `${input.name}-${index}`, input.name)"
      style="color: white"
      class="remove-image"
    />
  </div>
</template>

<script>
export default {
  name: "Input",

  emits: ["showItem", "saveFlag", "localItems"],

  props: {
    input: {
      type: Object,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
    localItems: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {};
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

    handleInput(event) {
      this.$emit("showItem", 1);
    },

    isToFromType(inputName) {
      if (inputName.includes("|") && inputName.split("|")[1] === "to-from") {
        return true;
      }

      return false;
    },

    datePickerCleared(value) {
      if (!value) {
        this.$nextTick(() => {
          this.$emit("saveFlag", true);
        }, 1000);
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
          var selectedFile = files[0];
          var reader = new FileReader();

          reader.onload = function (e) {
            var base64Data = e.target.result.split(",")[1];
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

    removeFile(index, inputName, fieldName) {
      if (this.localItems[index] && this.localItems[index][fieldName]) {
        this.$refs[inputName][0].value = "";

        const localItems = JSON.parse(JSON.stringify(this.localItems));
        localItems[index][fieldName] = [];
        this.$emit("localItems", localItems);
      }
    },
  },
};
</script>
