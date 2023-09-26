const { beforeEach } = require('mocha');
const addContext = require('mochawesome/addContext');



let tt
let dt1
let dt
let id_suppliers

let Company = Cypress.env("companyId")

describe('Supplier Families Metrics', () => {
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

  it('Post Supplier', () => {

    cy.Post_API_With_Body('purchases/companies/'+Company+'/suppliers', tt, dt1['code201'])
      .then(Response => {
        cy.log(JSON.stringify(Response.body))
        expect(Response.status).to.eq(201);

        id_suppliers = ((Response.body["id"]))
      })

  })



  it('Get total amount of invoices by exercise month', () => {
    cy.GET_API( 'purchases/companies/'+ Company + '/supplier-families/metrics/invoices/exercise-amount-monthly?supplierId='+id_suppliers, tt)
      .then(Response => {
        expect(Response.status).to.eq(200)
        //var d =(JSON.stringify(Response.body))

        cy.log(Response.body)

  



      })
  })






  it('Get total amount of invoices  exercise year', () => {
    cy.GET_API( 'purchases/companies/'+ Company + '/suppliers/metrics/invoices/exercise-amount-yearly', tt)
      .then(Response => {
        expect(Response.status).to.eq(200)
        //var d =(JSON.stringify(Response.body))

        cy.log(Response.body)



      })
  })


  it('Get total amount of invoices family by exercise year', () => {
    cy.GET_API( 'purchases/companies/'+ Company + '/supplier-families/metrics/invoices/exercise-amount-yearly', tt)
      .then(Response => {
        expect(Response.status).to.eq(200)
        //var d =(JSON.stringify(Response.body))

        cy.log(Response.body)

        })
      })



 
      it('Get total amount of invoices family civil year(monthly)', () => {
    cy.GET_API( 'purchases/companies/'+ Company + '/supplier-families/metrics/invoices/civil-year-amount-monthly', tt)
      .then(Response => {
        expect(Response.status).to.eq(200)
        //var d =(JSON.stringify(Response.body))

        cy.log(Response.body)


      })
  })


  it('Get total amount of invoices civil year (January 1st to December 31st)', () => {
    cy.GET_API( 'purchases/companies/'+ Company + '/supplier-families/metrics/invoices/civil-year-amount-yearly', tt)
      .then(Response => {
        expect(Response.status).to.eq(200)
        //var d =(JSON.stringify(Response.body))

        cy.log(Response.body)


      })
  })

  it('Get total amount of invoices for the last 12 months', () => {
    cy.GET_API( 'purchases/companies/'+ Company + '/supplier-families/metrics/invoices/amount-monthly?supplierId='+id_suppliers, tt)
      .then(Response => {
        expect(Response.status).to.eq(200)
        //var d =(JSON.stringify(Response.body))

        cy.log(Response.body)

      })
  })

  it('Delete suppliers', () => {    
    cy.DELETE_API('purchases/companies/'+Company+'/suppliers/' + id_suppliers, tt)



  })

})


