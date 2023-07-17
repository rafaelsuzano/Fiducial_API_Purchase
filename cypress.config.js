const { defineConfig } = require("cypress");

module.exports = defineConfig({
  

  env: {
  Login_dev: 'https://yav2-dev.yesaccount.com/',
  Url: 'https://purchases-dev.yesaccount.com/',
  companyId:1

  },

  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Fiducial API Test',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false},
 
  
  e2e: {
    baseUrl: 'https://recette-qa.facilia.com',
    viewportWidth: 1920,
    viewportHeight: 1080,
    setupNodeEvents(on, config) {
    require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
