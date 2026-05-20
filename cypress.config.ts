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
});
