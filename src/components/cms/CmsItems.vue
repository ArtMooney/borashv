<script setup>
import { Drag, DropList } from "vue-easy-dnd";
import "vue-easy-dnd/dist/dnd.css";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import xmark from "../../assets/xmark.vue";
import CmsItemTitle from "./CmsItemTitle.vue";
import LoadingSpinner from "../LoadingSpinner.vue";
</script>

<template>
  <div class="mx-auto mt-8 max-w-screen-md justify-center gap-4">
    <LoadingSpinner
      v-if="loadingFlag"
      class="!h-12 !w-12 justify-self-center py-12"
      color="#fac725"
    />

    <drop-list
      :items="localItems"
      @reorder="
        $event.apply(localItems);
        saveAllItems();
      "
    >
      <template v-slot:item="{ item, index }">
        <drag
          :delay="dragDelay"
          :vibration="dragVibration"
          @click="handleClick($event, index)"
          class="m-h-16 mb-4 grid cursor-pointer grid-cols-2 rounded bg-black/25 p-4 shadow-[3px_4px_12px_rgba(0,0,0,0.22)]"
          v-show="!loadingFlag"
          :ref="`list-item-${index}`"
          :key="item"
          handle=".dragdrop-handle"
        >
          <CmsItemTitle
            :item="item"
            :index="index"
            :saving-item-flag="savingItemFlag"
            :current-index="currentIndex"
            :saving-all-items-flag="savingAllItemsFlag"
            :show-item="showItem"
            :save-flag="saveFlag"
            :blink-anim="blinkAnim"
            :editing-new-item="editingNewItem"
          />

          <div
            class="col-span-2 grid grid-cols-[0.1fr,1fr] gap-3 text-sm"
            v-show="showItem === index"
          >
            <div class="col-span-2 my-4 h-px w-full bg-white/25"></div>

            <template v-for="input of schema[schemaIndex].fields">
              <div v-if="input.name !== 'index'">
                {{
                  input.name.includes("|")
                    ? input.name.split("|")[0]
                    : input.name
                }}
              </div>

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
                v-if="
                  input.name !== 'index' &&
                  getInputType(input.type) === 'checkbox'
                "
                @click="handleInput"
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                v-model="item[input.name]"
                :name="input.name"
              />

              <VueDatePicker
                v-if="
                  input.name !== 'index' &&
                  (getInputType(input.type) === 'date' ||
                    isToFromType(input.name))
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
                v-if="
                  input.name !== 'index' &&
                  getInputType(input.type) === 'textarea'
                "
                @click="handleInput"
                v-model="item[input.name]"
                :type="getInputType(input.type)"
                class="cms-input message w-input"
                :name="input.name"
              ></textarea>

              <div
                v-if="
                  input.name !== 'index' && getInputType(input.type) === 'file'
                "
                id="w-node-_59be39db-3067-b4db-62e1-04f78c919737-d10df2f5"
                class="filename-wrapper"
              >
                <input
                  v-if="
                    input.name !== 'index' &&
                    getInputType(input.type) === 'file'
                  "
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
                  @click.stop="
                    removeFile(index, `${input.name}-${index}`, input.name)
                  "
                  style="color: white"
                  class="remove-image"
                />
              </div>
            </template>
          </div>
        </drag>
      </template>
      <template v-slot:feedback="{ data }"></template>
    </drop-list>
  </div>
</template>

<script>
export default {
  name: "CmsItems",

  props: {
    schema: {
      type: Array,
      required: false,
      default: [],
    },
    items: {
      type: Array,
      required: false,
      default: [],
    },
    localItems: {
      type: Array,
      required: false,
      default: [],
    },
    loadingFlag: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data() {
    return {
      login: {},
      userName: `${import.meta.env.VITE_USERNAME}`,
      userPass: `${import.meta.env.VITE_USERPASS}`,
      cmsGetSchema: `${import.meta.env.VITE_APP_CMS_URL}/schema`,
      cmsUpdateItem: `${import.meta.env.VITE_APP_CMS_URL}/update`,
      cmsUpdateItems: `${import.meta.env.VITE_APP_CMS_URL}/update-batch`,
      cmsAddItem: `${import.meta.env.VITE_APP_CMS_URL}/add`,
      cmsDeleteItem: `${import.meta.env.VITE_APP_CMS_URL}/delete`,
      cmsName: "{{ simple }} CMS",
      baserowClientToken: `${import.meta.env.VITE_BASEROW_CLIENT_TOKEN}`,
      showItem: 0,
      saveFlag: false,
      savingItemFlag: false,
      savingAllItemsFlag: false,
      currentIndex: 0,
      schemaIndex: 0,
      initLoadedFlag: false,
      blinkAnim: false,
      dragDelay: 0,
      dragVibration: 100,
      editingNewItem: false,
      cmsSettingsMenu: false,
      selectDate: new Date(),
      showDateList: false,
      sortOrder: false,
    };
  },

  methods: {
    getFetch(urlEndpoint, headers, options) {
      return new Promise((resolve, reject) => {
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        if (headers !== null && headers !== undefined) {
          requestOptions.headers = headers;
        }

        fetch(urlEndpoint + (options ? "?" + options : ""), requestOptions)
          .then((response) => {
            if (!response.ok) throw new Error();
            return response.json();
          })
          .then((result) => {
            // console.log(result);
            resolve(result);
          })
          .catch((error) => {
            // console.log(error);
            reject(error);
          });
      });
    },

    postFetch(urlEndpoint, headers, body) {
      return new Promise((resolve, reject) => {
        var requestOptions = {
          method: "POST",
          redirect: "follow",
        };

        if (headers !== null && headers !== undefined) {
          requestOptions.headers = headers;
        }

        if (body !== null && body !== undefined) {
          requestOptions.body = JSON.stringify(body);
        }

        fetch(urlEndpoint, requestOptions)
          .then((response) => {
            if (!response.ok) throw new Error();
            return response.json();
          })
          .then((result) => {
            // console.log(result);
            resolve(result);
          })
          .catch((error) => {
            // console.log(error);
            reject(error);
          });
      });
    },

    async loadData() {
      this.$emit("loadingFlag", true);

      this.items = await fetch(
        `https://api.baserow.io/api/database/rows/table/${
          this.schema[this.schemaIndex].id
        }/?size=200&user_field_names=true`,
        { headers: { Authorization: "Token " + this.baserowClientToken } },
      )
        .then((response) => response.json())
        .then((data) => data.results);

      this.items.sort((a, b) => {
        const indexA = a.index;
        const indexB = b.index;
        return indexA - indexB; // Ascending order
      });

      // parse to-from date-fields to json
      for (const item of this.items) {
        for (const field of Object.entries(item)) {
          if (field[0].includes("|") && field[0].includes("to-from")) {
            if (item[field[0]]) {
              item[field[0]] = JSON.parse(item[field[0]]);
            }
          }
        }
      }

      this.localItems = JSON.parse(JSON.stringify(this.items));

      this.$emit("loadingFlag", false);
      this.initLoadedFlag = true;
      this.$emit("initLoadedFlag", true);
    },

    handleClick(event, index) {
      if (
        this.saveFlag &&
        event.target.nodeName !== "INPUT" &&
        event.target.nodeName !== "TEXTAREA" &&
        event.target.nodeName !== "SPAN" &&
        event.target.nodeName !== "LABEL"
      ) {
        this.alertSaveFlag();
        return;
      }

      // if delete is clicked, do not change showItem panel
      if (event.target.innerText !== "Delete") {
        event.target.scrollIntoView({ behavior: "smooth", block: "start" });
        this.showItem = this.showItem === index ? 0 : index;
      }

      this.currentIndex = index;
    },

    datePickerCleared(value) {
      if (!value) {
        this.$nextTick(() => {
          this.saveFlag = true;
        }, 1000);
      }
    },

    handleClickOutside(event) {
      if (event.target.className !== "sort-by-date") {
        this.showDateList = false;
      }
    },

    alertSaveFlag() {
      const element = this.$refs["list-item-" + this.showItem].$el;

      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      this.blinkAnim = true;
      setTimeout(() => {
        this.blinkAnim = false;
      }, 2000);
    },

    handleInput(event) {
      this.showItem = 1;
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
      if (inputName.includes("|") && inputName.split("|")[1] === "to-from") {
        return true;
      }

      return false;
    },

    isItemChanged(localItems, items) {
      if ((!items && !localItems) || this.editingNewItem) return null;

      let modified = false;

      for (const [index, input] of Object.entries(localItems)) {
        const localObject = JSON.stringify(input);
        const itemsObject = JSON.stringify(items[index]);

        if (
          (localObject !== itemsObject &&
            index === this.schema[this.schemaIndex].fields[0].name &&
            input.trim() !== "") ||
          (localObject !== itemsObject &&
            input !== null &&
            index !== this.schema[this.schemaIndex].fields[0].name)
        ) {
          modified = true;
        }
      }

      return modified;
    },

    getItemJson(index) {
      let itemJson = {};
      itemJson = JSON.parse(JSON.stringify(this.localItems[index]));

      // delete keys where values are empty
      for (const item of Object.entries(itemJson)) {
        if (!item[1]) {
          delete itemJson[item[0]];
        }
      }

      itemJson.id = this.localItems[index].id;
      itemJson.tableid = this.schema[this.schemaIndex].id;

      return itemJson;
    },

    getItemOrder(index) {
      let itemJson = {};
      itemJson = {};
      itemJson.index = index;
      itemJson.id = this.localItems[index].id;

      return itemJson;
    },

    async saveItem(index, item) {
      this.savingItemFlag = true;
      this.saveFlag = false;
      const saveData = JSON.parse(JSON.stringify(item));

      // convert date-format if needed and stringify multidate-fields
      for (const field of this.schema[this.schemaIndex].fields) {
        if (field.type === "date") {
          saveData[field.name] = this.convertDateToIso(saveData[field.name]);
        }

        if (field.name.includes("|") && field.name.includes("to-from")) {
          saveData[field.name] = JSON.stringify(saveData[field.name]);
        }
      }

      if (this.editingNewItem) {
        const savedItem = await this.postFetch(
          this.cmsAddItem,
          new Headers({
            "Content-Type": "application/json",
            Authorization:
              "Basic " + btoa(`${this.login.email}:${this.login.password}`),
          }),
          {
            item: saveData,
            tableid: this.schema[this.schemaIndex].id,
            fields: this.schema[this.schemaIndex].fields,
          },
        );

        this.editingNewItem = false;
        this.localItems[index] = savedItem;
        this.localItems[index].id = savedItem.id;
      } else {
        const updateItem = await this.postFetch(
          this.cmsUpdateItem,
          new Headers({
            "Content-Type": "application/json",
            Authorization:
              "Basic " + btoa(`${this.login.email}:${this.login.password}`),
          }),
          {
            item: saveData,
            tableid: this.schema[this.schemaIndex].id,
            fields: this.schema[this.schemaIndex].fields,
          },
        );
      }

      this.items = JSON.parse(JSON.stringify(this.localItems));
      this.savingItemFlag = false;
      this.saveFlag = false;
      this.showItem = 0;
    },

    convertDateToIso(date) {
      if (!date) return null;

      const originalDate = date;
      const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;

      if (isoDatePattern.test(originalDate)) {
        return originalDate;
      } else {
        // Convert the non-ISO date to ISO format and extract only the date part
        const isoDate = new Date(originalDate).toISOString().split("T")[0];
        return isoDate;
      }
    },

    async saveAllItems() {
      const itemArray = [];
      this.savingAllItemsFlag = true;
      this.saveFlag = true;

      for (const [index, item] of Object.entries(this.localItems)) {
        item.index = index;
        itemArray.push(this.getItemOrder(index));
      }

      const updateItems = await this.postFetch(
        this.cmsUpdateItems,
        new Headers({
          "Content-Type": "application/json",
          Authorization:
            "Basic " + btoa(`${this.login.email}:${this.login.password}`),
        }),
        {
          items: itemArray,
          tableid: this.schema[this.schemaIndex].id,
          fields: this.schema[this.schemaIndex].fields,
        },
      );

      this.items = JSON.parse(JSON.stringify(this.localItems));
      this.savingAllItemsFlag = false;
      this.saveFlag = false;
    },

    async cancelItem(index) {
      this.saveFlag = false;
      this.localItems = JSON.parse(JSON.stringify(this.items));
      this.showItem = 0;
    },

    deleteItem(index) {
      this.savingItemFlag = true;
      this.saveFlag = false;
      this.currentIndex = index;

      setTimeout(async () => {
        this.showItem = 0;

        const currentItem = this.getItemJson(index);
        const deletedItem = await this.postFetch(
          this.cmsDeleteItem,
          new Headers({
            "Content-Type": "application/json",
            Authorization:
              "Basic " + btoa(`${this.login.email}:${this.login.password}`),
          }),
          {
            tableid: currentItem.tableid,
            id: currentItem.id,
          },
        );

        this.localItems.splice(index, 1);

        this.items = JSON.parse(JSON.stringify(this.localItems));
        this.savingItemFlag = false;

        this.saveAllItems(); // to reindex after delete
      }, 100);
    },

    addItem() {
      if (this.saveFlag) {
        this.alertSaveFlag();
        return;
      }

      this.editingNewItem = true;
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

      this.showItem = this.showItem === index ? 0 : index;

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
      if (this.saveFlag) {
        this.alertSaveFlag();
        return;
      }

      this.showDateList = !this.showDateList;
    },

    getDateList() {
      const dateList = [];

      for (const item of this.schema[this.schemaIndex].fields) {
        if (item.type === "date") {
          dateList.push(item);
        }

        if (item.name.includes("|") && item.name.includes("to-from")) {
          dateList.push(item);
        }
      }

      return dateList;
    },

    sortDateField(event) {
      const sortedItems = [];
      const sortedItemNulls = [];
      let sortName = event.target.innerText;

      // assure that we have the full name if special date format
      for (const item of this.schema[this.schemaIndex].fields) {
        if (`${sortName}|to-from` === item.name) {
          sortName = item.name;
        }
      }

      for (const item of this.localItems) {
        if (item[sortName]) {
          sortedItems.push(item);
        } else {
          sortedItemNulls.push(item);
        }
      }

      if (!this.sortOrder) {
        this.sortOrder = true;

        sortedItems.sort((a, b) => {
          const dateA =
            typeof a[sortName] === "object"
              ? new Date(a[sortName][0])
              : new Date(a[sortName]);
          const dateB =
            typeof b[sortName] === "object"
              ? new Date(b[sortName][0])
              : new Date(b[sortName]);

          return dateA - dateB; // Ascending order
        });
      } else {
        this.sortOrder = false;

        sortedItems.sort((a, b) => {
          const dateA =
            typeof a[sortName] === "object"
              ? new Date(a[sortName][0])
              : new Date(a[sortName]);
          const dateB =
            typeof b[sortName] === "object"
              ? new Date(b[sortName][0])
              : new Date(b[sortName]);

          return dateB - dateA; // Descending order
        });
      }

      const allItems = sortedItems.concat(sortedItemNulls);
      const newList = [];
      let numberNulls = 0;

      // pair them based on the index and with the nulls (undated objects) always in their original place
      for (const [index, all] of Object.entries(allItems)) {
        let isNull = false;

        for (const nullItem of sortedItemNulls) {
          if (parseInt(nullItem.index) === parseInt(index)) {
            newList.push(nullItem);
            isNull = true;
            numberNulls = numberNulls + 1;
          }
        }

        if (!isNull) {
          newList.push(sortedItems[parseInt(index - numberNulls)]);
        }
      }

      this.localItems = JSON.parse(JSON.stringify(newList));
      this.showDateList = false;
      this.saveAllItems();
    },

    getLocalStorage(name) {
      const itemStr = localStorage.getItem(name);

      if (!itemStr) {
        return null;
      }

      const item = JSON.parse(itemStr);
      const now = new Date();

      if (now.getTime() > item.expiry) {
        localStorage.removeItem(name);
        return null;
      }
      return item.value;
    },

    deleteLocalStorage(name) {
      localStorage.removeItem(name);
    },

    backHomepage() {
      const protocol = window.location.protocol + "//";
      const siteDomain = window.location.host;

      window.location.href = protocol + siteDomain;
    },

    logOut() {
      this.deleteLocalStorage("simple-cms-login");
      location.reload();
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
        this.localItems[index][fieldName] = [];
      }
    },
  },

  watch: {
    localItems: {
      deep: true,
      handler(allInputs) {
        if (this.currentIndex === false || this.editingNewItem) return;

        if (
          this.isItemChanged(
            allInputs[this.currentIndex],
            this.items[this.currentIndex],
          )
        ) {
          this.saveFlag = true;
        } else {
          this.saveFlag = false;
        }
      },
    },

    schemaIndex() {
      this.showItem = 0;
      this.loadData();
      window.scrollTo(0, 0);
    },

    showItem() {
      if (this.showItem === 0) {
        this.dragDelay = 0;
      } else {
        this.dragDelay = 86400000;
      }
    },

    selectDate(date) {
      this.selectDate = date;
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
