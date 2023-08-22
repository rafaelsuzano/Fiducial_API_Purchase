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

describe('Validations', () => {
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



  it('Invoices Validations Summary', () => {
    cy.GET_API('purchases/companies/'+Company+'/invoices-validations/summary', tt)
      .then(Response => {
        expect(Response.status).to.eq(200)
        //var d =(JSON.stringify(Response.body))
        //var d = ((Response.body.items))


        cy.log(JSON.stringify(Response.body))
        

      })
  })

  it('Get a list of invoices validations', () => {
    cy.GET_API('purchases/companies/'+Company+'/invoices-validations', tt)
      .then(Response => {
        expect(Response.status).to.eq(200)
        cy.log(JSON.stringify(Response.body))
        


      })
  })

  it('Export validations Excel', () => {
    cy.GET_API('purchases/companies/'+Company+'/invoices-validations/export?page=0&size=30&sort=number,asc&companyId='+Company+'&exportFile%5Btype%5D=EXCEL', tt)
      .then(Response => {
        expect(Response.status).to.eq(200)
        //var d =(JSON.stringify(Response.body))
        cy.log(JSON.stringify(Response.body))
        


     


      })
  })

  it('Export validations CSV COMMA', () => {
    cy.GET_API('purchases/companies/'+Company+'/invoices-validations/export?page=0&size=30&sort=number,asc&companyId='+Company+'&exportFile%5Btype%5D=CSV&exportFile%5Bseparator%5D=COMMA', tt)
      .then(Response => {
        expect(Response.status).to.eq(200)
        //var d =(JSON.stringify(Response.body))
        cy.log(JSON.stringify(Response.body))
        


       

      })
  })


  it('Export validations CSV SEMICOLON', () => {
    cy.GET_API('purchases/companies/'+Company+'/invoices-validations/export?page=0&size=30&sort=number,asc&companyId='+Company+'&exportFile%5Btype%5D=CSV&exportFile%5Bseparator%5D=SEMICOLON', tt)
      .then(Response => {
        expect(Response.status).to.eq(200)
        //var d =(JSON.stringify(Response.body))
        cy.log(JSON.stringify(Response.body))
        


       

      })
  })



}) 