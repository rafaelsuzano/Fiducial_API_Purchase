const { beforeEach } = require('mocha');
const addContext = require('mochawesome/addContext');



let tt
let dt1



let Company = Cypress.env("companyId")

describe('Invoices Last Paid', () => {
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




  it('Get Invoices Last Paid', () => {
    cy.GET_API_SALES('companies/'+Company+'/invoices/last-paid', tt)
      .then(Response => {
        expect(Response.status).to.eq(200)







      })
  })


})