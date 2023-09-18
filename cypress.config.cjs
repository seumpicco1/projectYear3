const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
   specPattern: "cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}",
   baseUrl: "http://25.18.60.149:5173/",
   experimentalSessionAndOrigin: true
  },
});
