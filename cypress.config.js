const { defineConfig } = require("cypress");
const fs = require('fs')

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
    //baseUrl:"https://dev.yesaccount.com",
    baseUrl:"https://recette-qa.facilia.com/",
    viewportWidth: 1920,
    viewportHeight: 1080,
    setupNodeEvents(on, config) {
    require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
  setupNodeEvents(on, config) {
    on('after:spec', (spec, results) => {
      if (results && results.stats.failures === 0 && results.video)
        return fs.unlinkSync(results.video);
    })
  },
  videoUploadOnPasses: false,
});
