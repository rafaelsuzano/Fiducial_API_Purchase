echo 'Gera Relatorio Achats_InvoicesMetrics.'
rm -rf reports/*.*
npx cypress run  --spec cypress/e2e/Achats/InvoicesMetrics.cy.js --config video=false,screenshotOnRunFailure=false --reporter junit --reporter-options "mochaFile=reports/TEST-[hash].xml"
junitparser merge  --glob "reports/TEST-*"  "reports/junit-report_Achats_InvoicesMetrics.xml"
trcli -y -h https://facilia.testrail.io/  --project "Facilia" --username  rafael.cruz-exterieur@fiducial.net  --password Suz@no30  parse_junit --title "Cypress API Automated Test Run Achats_InvoicesMetrics" -f "./reports/junit-report_Achats_InvoicesMetrics.xml"