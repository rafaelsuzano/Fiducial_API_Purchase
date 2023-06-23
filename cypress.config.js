const { defineConfig } = require("cypress");

module.exports = defineConfig({
  

  env: {
  Login_dev: 'https://yav2-dev.yesaccount.com/',
  Url: 'https://purchases-dev.yesaccount.com/'

  },

  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false},
 
  
  e2e: {
    
    setupNodeEvents(on, config) {
    require('cypress-mochawesome-reporter/plugin')(on);

   


    },
  },
});
