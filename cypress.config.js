const { defineConfig } = require('cypress');
const TestRailReporter = require('cypress-testrail');

require('dotenv').config();


module.exports = (on, config) => {
  // configure and register our reporter
  new TestRailReporter(on, config).register();
  
  return config
}


module.exports = defineConfig({
  "defaultCommandTimeout": 70000,
    // configure and register our reporter
  

  env: {

    url_sales : 'https://recette-int-qa.facilia.com/',  
    Login: 'https://recette-int-qa.facilia.com/login',
    Url: '  https://purchase-qa.facilia.com/',
    companyId: 2
    


  },

  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Fiducial API Test',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false
  },


    e2e: {
      setupNodeEvents(on, config) {
        //require('cypress-mochawesome-reporter/plugin')(on);
        new TestRailReporter(on, config).register();
        return config

        },
     
    },
  })
