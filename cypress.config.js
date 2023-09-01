const { defineConfig } = require('cypress');


module.exports = defineConfig({
  "defaultCommandTimeout": 70000,
    // configure and register our reporter
  

  env: {

    url_sales : 'https://recette-int-qa.facilia.com/',  
    Login: 'https://recette-int-qa.facilia.com/login',
    Url: '  https://purchase-qa.facilia.com/',
    companyId: 2,
    email: 'sad@fiducial.net',
    password: '1234'

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
      on('after:run', (results) => {

        if (results) {
          // results will be undefined in interactive mode
          console.log(
            results.totalPassed,
            'out of',
            results.totalTests,
            'passed'
          )
        }
      })
    },
  },
})