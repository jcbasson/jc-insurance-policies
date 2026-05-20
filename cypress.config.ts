import { defineConfig } from "cypress";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  allowCypressEnv: false,

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
      viteConfig: {
        plugins: [tailwindcss()],
      },
    },
  },

  e2e: {
    baseUrl: "http://127.0.0.1:5173",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
