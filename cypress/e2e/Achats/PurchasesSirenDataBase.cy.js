const { beforeEach } = require('mocha');
const addContext = require('mochawesome/addContext');

let dt1
let tt
let id_suppliers_france
let Company = Cypress.env("companyId")

describe('OCR', () => {
  before(() => {
    cy.fixture('supplier.json').then(dt => {
      dt1 = dt;

      cy.api("POST", Cypress.env('Login'), {
        "email": Cypress.env('email'),
        "password": Cypress.env('password')
      }).then((response) => {

        //tt=JSON.stringify(response.body.token)
        tt = (response.body.token)
      })

    })
  })




  it.skip('Post Supplier 201 France Sir', () => {

    cy.Post_API_With_Body('purchases/companies/' + Company + '/suppliers', tt, dt1['code201_France_SIRET_OCR'])
      .then(Response => {
        cy.log(JSON.stringify(Response.body))
        expect(Response.status).to.eq(201);

        id_suppliers_france = ((Response.body["id"]))
      })

  })
})
