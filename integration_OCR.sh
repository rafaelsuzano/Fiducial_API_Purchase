echo 'Gera Relatorio ORC'
rm -rf reports/*.*
npx cypress run  --spec cypress/e2e/ORC/ORC.cy.js  --config video=false,screenshotOnRunFailure=false --reporter junit --reporter-options "mochaFile=reports/TEST-[hash].xml"
junitparser merge  --glob "reports/TEST-*"  "reports/junit-report_OCR.xml"
trcli -y -h https://facilia.testrail.io/  --project "Facilia" --username  rafael.cruz-exterieur@fiducial.net  --password Suz@no30  parse_junit --title "Cypress API Automated Test Run OCR" -f "./reports/junit-report_OCR.xml"