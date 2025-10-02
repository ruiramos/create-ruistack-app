import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "~/client": path.resolve(__dirname, "./client"),
      "@": path.resolve(__dirname, "./client"),
    },
  },
  plugins: [react(), tailwindcss()],
});
