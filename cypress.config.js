const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env:{
  ELECTRON_EXTRA_LAUNCH_ARGS: '--disable-gpu'
  },
  
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
