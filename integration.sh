echo 'Gera Relatorio'

junitparser merge  --glob "reports/TEST-*"  "reports/junit-report.xml"


trcli -y \
    -h https://facilia.testrail.io  \ 
    --project "Facilia" \ 
    --username  rafael.cruz-exterieur@fiducial.net \
    --password Suz@no30 \
    parse_junit \
    --title "Cypress Automated Test Run" \
    "./reports/junit-report.xml"
 