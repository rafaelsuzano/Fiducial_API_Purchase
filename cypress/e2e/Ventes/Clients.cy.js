const { beforeEach } = require('mocha');
const addContext = require('mochawesome/addContext');



let tt
let dt1



let Company = Cypress.env("companyId")

describe('Clients', () => {
    before(() => {
        cy.fixture('supplier.json').then(dt => {
            dt1 = dt;




            cy.api("POST", Cypress.env('Login'), {
                "email": "sad@fiducial.net",
                "password": "1234"
            }).then((response) => {

                //tt=JSON.stringify(response.body.token)
                tt = (response.body.token)
            })

        })
    })




    it('Get_ExportClients_Excel Separtor COMMA 200', () => {
        cy.GET_API_SALES('companies/' + Company + '/clients/export?companyId=' + Company + '&exportFile%5Btype%5D=CSV&exportFile%5Bseparator%5D=COMMA', tt)
            .then(Response => {
                expect(Response.status).to.eq(200)
                //var d =(JSON.stringify(Response.body))

                cy.log(Response.body)

            })


    })




it('Get_ExportClients_Excel 200', () => {
    cy.GET_API_SALES('companies/2/clients/export?companyId=2&exportFile%5Btype%5D=EXCEL', tt)
        .then(Response => {
            expect(Response.status).to.eq(200)
            //var d =(JSON.stringify(Response.body))

        })
})





it('Get_ExportClients_Excel exportFile 403', () => {
    cy.GET_API_SALES('companies/' + Company + '/clients/export?companyId=' + Company + '&exportFile%5Btype%5D=CSV&exportFile%5Bseparator%5D=', tt)
        .then(Response => {
            expect(Response.status).to.eq(403)
            //var d =(JSON.stringify(Response.body))

            cy.log(Response.body)
        })

})




})

