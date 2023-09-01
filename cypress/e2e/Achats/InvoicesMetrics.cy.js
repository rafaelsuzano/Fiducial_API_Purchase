const { beforeEach } = require('mocha');
const addContext = require('mochawesome/addContext');



let tt
let dt1


let Company = Cypress.env("companyId")

describe('Suppliers', () => {
  before(() => {
    cy.fixture('supplier.json').then(dt => {
      dt1 = dt;




      cy.api("POST",  Cypress.env('Login') , {
        "email": Cypress.env('email') ,
        "password": Cypress.env('password')
      }).then((response) => {

        //tt=JSON.stringify(response.body.token)
        tt = (response.body.token)
      })

    })
  })




  it('Get a current invoices stats', () => {
    cy.GET_API('purchases/companies/'+ Company + 'invoices/current-invoices-stats', tt)
      .then(Response => {
        expect(Response.status).to.eq(200)
        //var d =(JSON.stringify(Response.body))

        cy.log(Response.body)

  
     


      })
  })
})