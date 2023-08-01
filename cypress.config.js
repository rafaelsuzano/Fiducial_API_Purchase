const { defineConfig } = require('cypress');

require('dotenv').config();


module.exports = defineConfig({
  "defaultCommandTimeout": 70000,


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
        on('after:run', async (results) => {   
          const TestrailIntegration = require('cypress-testrail-integration');
          const testrailIntegration = new TestrailIntegration(
            process.env.TESTRAIL_USERNAME,
            process.env.TESTRAIL_PASSWORD,
            process.env.TESTRAIL_HOSTNAME,
            process.env.TESTRAIL_PROJECT_ID,
            testRunName = 'New Test Run' // adding a new name for Test Run
          );
          await testrailIntegration.addResultsToTestRailTestRun(results);
        });
        return config;
      },
     
    },
  })
