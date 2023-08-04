const { beforeEach } = require('mocha');
const addContext = require('mochawesome/addContext');



let tt
let dt1
let dt


let Company = Cypress.env("companyId")

describe('Purchases Payment', () => {
  before(() => {
    cy.fixture('supplier.json').then(dt => {
      dt1 = dt;




      cy.api("POST",  Cypress.env('Login') , {
        "email": "sad@fiducial.net",
        "password": "1234"
      }).then((response) => {

        //tt=JSON.stringify(response.body.token)
        tt = (response.body.token)
      })

    })
  })




  it('Get a list of payments', () => {
    cy.GET_API( 'purchases/companies/'+ Company + '/payments', tt)
      .then(Response => {
        expect(Response.status).to.eq(200)

        cy.log(Response.body)

  



      })
  })



})