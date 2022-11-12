const { defineConfig } = require("cypress");

module.exports = defineConfig({
  url: "http://localhost:3000", // some how e2e.baseUrl make cy.visit fail
  e2e: {
    baseUrl: "http://localhost:3000",
  },
  chromeWebSecurity: false,

  reporterOptions: {
    configFile: "config/reporter.json",
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
