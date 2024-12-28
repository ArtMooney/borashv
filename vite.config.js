import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import responsiveImages from "./vite-plugin-responsive-images";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), responsiveImages()],
});
