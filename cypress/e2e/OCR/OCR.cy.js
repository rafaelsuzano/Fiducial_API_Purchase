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

describe('OCR', () => {
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

  context('Get Status', () => {
  it('Get documents references list TO_VALIDATE', () => {
    cy.GET_API('ocr/documents-references?status=TO_VALIDATE', tt)
      .then(Response => {
        expect(Response.status).to.eq(200)


       
        cy.log( (JSON.stringify(Response.body)))



      })
  })



  it('Get documents references list NOT_PROCESSED', () => {
    cy.GET_API('ocr/documents-references?status=NOT_PROCESSED', tt)
      .then(Response => {
        expect(Response.status).to.eq(200)

        cy.log( (JSON.stringify(Response.body)))


      })
  })





  it('Get documents references list IN_PROCESS', () => {
    cy.GET_API('ocr/documents-references?status=IN_PROCESS', tt)
      .then(Response => {
        expect(Response.status).to.eq(200)


        cy.log( (JSON.stringify(Response.body)))


      })
  })



  it('Get documents references list PROCESSED', () => {
    cy.GET_API('ocr/documents-references?status=PROCESSED', tt)
      .then(Response => {
        expect(Response.status).to.eq(200)



        cy.log( (JSON.stringify(Response.body)))




      })
  })


  it('Get documents references list REFUSED', () => {
    cy.GET_API('ocr/documents-references?status=REFUSED', tt)
      .then(Response => {
        expect(Response.status).to.eq(200)


        cy.log( (JSON.stringify(Response.body)))



      })
  })


  it('Get documents references list ACCEPTED', () => {
    cy.GET_API('ocr/documents-references?status=ACCEPTED', tt)
      .then(Response => {
        expect(Response.status).to.eq(200)

     
        cy.log( (JSON.stringify(Response.body)))



      })
  })


  it('Get the nex document to be process', () => {
    cy.GET_API('ocr/documents/next_to_process', tt)
      .then(Response => {
        expect(Response.status).to.eq(200)

     
        cy.log( (JSON.stringify(Response.body)))



      })
  })


})



context(' Post', () => {

})

})