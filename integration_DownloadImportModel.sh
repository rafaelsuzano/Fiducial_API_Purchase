echo 'Gera Relatorio Ventes DownloadImportModel'
rm -rf cypress/reports/*.*
npx cypress run  --spec cypress/e2e/Ventes/DownloadImportModel.cy.js --config video=false,screenshotOnRunFailure=false --reporter junit --reporter-options "mochaFile=reports/TEST-[hash].xml"
junitparser merge  --glob "reports/TEST-*"  "reports/junit-report_Ventes_DownloadImportModel.xml"
trcli -y -h https://facilia.testrail.io/  --project "Facilia" --username  rafael.cruz-exterieur@fiducial.net  --password Suz@no30  parse_junit --title "Cypress API Automated Test Run Ventes_DownloadImportModel" -f "./reports/junit-report_Ventes_DownloadImportModel.xml"