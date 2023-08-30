echo 'Gera Relatorio Achats_SupplierFamily.'
rm -rf reports/*.*
npx cypress run  --spec cypress/e2e/Achats/SupplierFamily.cy.js --config video=false,screenshotOnRunFailure=false --reporter junit --reporter-options "mochaFile=reports/TEST-[hash].xml"amilies
junitparser merge  --glob "reports/TEST-*"  "reports/junit-report_Achats_SupplierFamily.xml"
trcli -y -h https://facilia.testrail.io/  --project "Facilia" --username  rafael.cruz-exterieur@fiducial.net  --password Suz@no30  parse_junit --title "Cypress API Automated Test Run Achats_SupplierFamily" -f "./reports/junit-report_Achats_SupplierFamily.xml"