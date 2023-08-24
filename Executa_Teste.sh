
rm -rf cypress/reports/*.*
./integration_Ventes_Countries.sh 
rm -rf cypress/reports/*.*
./integration_Ventes_Clients.sh
rm -rf cypress/reports/*.*
./integration_DownloadImportModel.sh


rm -rf cypress/reports/junit-report_Ventes_DownloadImportModel.xml
rm -rf cypress/reports/junit-report_Ventes_Countries.xml
rm -rf cypress/reports/junit-report_Ventes_Clients.xml




junitparser merge  --glob "reports/TEST-*"  "reports/junit-report.xml"
trcli -y -h https://facilia.testrail.io/  --project "Facilia" --username  rafael.cruz-exterieur@fiducial.net  --password Suz@no30  parse_junit --title "Cypress API Automated Test Run Ventes" -f "./reports/junit-report.xml"
rm -rf cypress/reports/{,.[!.],..?}*