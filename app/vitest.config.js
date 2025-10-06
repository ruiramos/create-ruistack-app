import path from "path";

export default {
  test: {
    setupFiles: ["vitest.setup.ts"],
    exclude: ["tests/e2e/**", "**node_modules**"], // playwright e2e
  },
  resolve: {
    alias: {
      "~/server": path.resolve(__dirname, "./server"),
    },
  },
};
