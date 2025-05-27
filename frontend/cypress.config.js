import { defineConfig } from "cypress";

const port = process.env.VITE_PORT || 4173

export default defineConfig({
  e2e: {
    baseUrl: `http://localhost:${port}`,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
