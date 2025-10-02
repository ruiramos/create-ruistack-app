import path from "path";

export default {
  test: {
    setupFiles: ["vitest.setup.ts"],
  },
  resolve: {
    alias: {
      "~/server": path.resolve(__dirname, "./server"),
    },
  },
};
