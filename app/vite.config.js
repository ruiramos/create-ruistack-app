import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "~/client": path.resolve(__dirname, "./client"),
    },
  },
  plugins: [react()],
});
