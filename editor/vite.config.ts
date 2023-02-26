import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  base: command === "build" ? "TooYea" : "/",
  plugins: [react({ tsDecorators: true })],
  server: {
    port: 8080,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalDate: `@import ~@semi-bot/semi-theme-tooyea/scss/index.scss`,
      },
    },
  },
}));
