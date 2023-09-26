const { beforeEach } = require('mocha');
const addContext = require('mochawesome/addContext');



let tt
let dt1
let id_suppliers_france

let Company = Cypress.env("companyId")

describe('Invoices Metrics', () => {
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

        id_suppliers_france = ((Response.body["id"]))
      })

  })



  it('Get a current invoices stats', () => {

    cy.GET_API('purchases/companies/'+ Company + '/invoices/current-invoices-stats?supplierId='+id_suppliers_france, tt)
      .then(Response => {
        expect(Response.status).to.eq(200)
        //var d =(JSON.stringify(Response.body))
        cy.log(JSON.stringify(Response.body))



      })
  })



  it('Get accepted invoices amount for each supplier for exercise monthly period', () => {
    cy.GET_API('purchases/companies/'+ Company + '/suppliers/metrics/invoices/exercise-amount-monthly?supplierId='+id_suppliers_france, tt)
      .then(Response => {
        expect(Response.status).to.eq(200)
        //var d =(JSON.stringify(Response.body))

        cy.log(JSON.stringify(Response.body)) 
  
     
      })

      })
  
  it('Delete suppliers', () => {    
      cy.DELETE_API('purchases/companies/'+Company+'/suppliers/' + id_suppliers_france, tt)

  
  
    })

  })
