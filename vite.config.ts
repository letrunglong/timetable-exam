import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath, URL } from "node:url";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 9999,
    hmr: {
      overlay: false,
    },
  },
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
