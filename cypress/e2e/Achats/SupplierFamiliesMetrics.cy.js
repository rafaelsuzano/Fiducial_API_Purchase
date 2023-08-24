const { beforeEach } = require('mocha');
const addContext = require('mochawesome/addContext');



let tt
let dt1
let dt


let Company = Cypress.env("companyId")

describe('SupplierFamiliesMetrics', () => {
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




  it('Get total amount of invoices of the suppliers belonging to a given family by exercise month', () => {
    cy.GET_API( 'purchases/companies/'+ Company + '/supplier-families/metrics/invoices/exercise-amount-monthly', tt)
      .then(Response => {
        expect(Response.status).to.eq(200)
        //var d =(JSON.stringify(Response.body))

        cy.log(Response.body)

  



      })
  })






  it('Get total amount of invoices of the suppliers belonging to a given family by exercise year', () => {
    cy.GET_API( 'purchases/companies/'+ Company + '/suppliers/metrics/invoices/exercise-amount-yearly', tt)
      .then(Response => {
        expect(Response.status).to.eq(200)
        //var d =(JSON.stringify(Response.body))

        cy.log(Response.body)



      })
  })


  it('Get total amount of invoices of the suppliers belonging to a given family by exercise year', () => {
    cy.GET_API( 'purchases/companies/'+ Company + '/supplier-families/metrics/invoices/exercise-amount-yearly', tt)
      .then(Response => {
        expect(Response.status).to.eq(200)
        //var d =(JSON.stringify(Response.body))

        cy.log(Response.body)

        })
      })



 
      it('Get total amount of invoices of the suppliers belonging to a given family by civil year (monthly)', () => {
    cy.GET_API( 'purchases/companies/'+ Company + '/supplier-families/metrics/invoices/civil-year-amount-monthly', tt)
      .then(Response => {
        expect(Response.status).to.eq(200)
        //var d =(JSON.stringify(Response.body))

        cy.log(Response.body)


      })
  })


  it('Get total amount of invoices of the suppliers belonging to a given family by civil year (January 1st to December 31st)', () => {
    cy.GET_API( 'purchases/companies/'+ Company + '/supplier-families/metrics/invoices/civil-year-amount-yearly', tt)
      .then(Response => {
        expect(Response.status).to.eq(200)
        //var d =(JSON.stringify(Response.body))

        cy.log(Response.body)


      })
  })

  it('Get total amount of invoices of the suppliers belonging to a given family for the last 12 months', () => {
    cy.GET_API( 'purchases/companies/'+ Company + '/supplier-families/metrics/invoices/amount-monthly', tt)
      .then(Response => {
        expect(Response.status).to.eq(200)
        //var d =(JSON.stringify(Response.body))

        cy.log(Response.body)

      })
  })




})