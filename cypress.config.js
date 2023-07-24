const { defineConfig } = require("cypress");

module.exports = defineConfig({
  

  env: {
  //Login: 'https://yav2-dev.yesaccount.com/',
  //Url: 'https://purchases-dev.yesaccount.com/',
  
  Login: 'https://recette-int-qa.facilia.com/login',
  Url: '  https://purchase-qa.facilia.com/',
  



  
  companyId:2

  },

  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Fiducial API Test',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false},
 
  
  e2e: {
    
    setupNodeEvents(on, config) {
    require('cypress-mochawesome-reporter/plugin')(on);

   


    },
  },
});
