import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  base: command === "build" ? "TooYea" : "/",
  plugins: [react({ tsDecorators: true })],
  server: {
    port: 8080,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalDate: `@import ~@semi-bot/semi-theme-tooyea/scss/index.scss`,
      },
    },
  },
}));
