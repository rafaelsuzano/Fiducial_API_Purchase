const { beforeEach } = require('mocha');
const addContext = require('mochawesome/addContext');



let tt
let dt1
let id_delete
let ID_TESTE

let id_suppliers
let dt_Family
let id_suppliers_france
let id_suppliers_Family
let id_suppliers_contacts
let id_suppliers_paymentInfo

let Company = Cypress.env("companyId")

describe('Invoices', () => {
  before(() => {
    cy.fixture('supplier.json').then(dt => {
      dt1 = dt;




      cy.api("POST", Cypress.env('Login') , {
        "email": Cypress.env('email') ,
        "password": Cypress.env('password')
      }).then((response) => {

        //tt=JSON.stringify(response.body.token)
        tt = (response.body.token)
      })

    })
  })

  it('Get a list of invoices payments', () => {
    cy.GET_API('purchases/companies/'+Company+'/invoice/invoices-payments', tt)
      .then(Response => {
        expect(Response.status).to.eq(200)
        //var d =(JSON.stringify(Response.body))
        var d = ((Response.body.items))


        for (var index in d) {
          id_suppliers = (d[index].id)
          //cy.log(d[index].id)
        }
        cy.addContext("Test get Suppliers")


      })
  })

  it('Get Invoices Payments Summary', () => {
    cy.GET_API('purchases/companies/'+Company+'/invoices-payments/summary', tt)
      .then(Response => {
        expect(Response.status).to.eq(200)
        //var d =(JSON.stringify(Response.body))
        var d = ((Response.body.items))


        for (var index in d) {
          id_suppliers = (d[index].id)
          //cy.log(d[index].id)
        }
        cy.addContext("Test get Suppliers")


      })
  })


})  