const { beforeEach } = require('mocha');
const addContext = require('mochawesome/addContext');



let tt
let dt1



let Company = Cypress.env("companyId")

describe('ValueRange', () => {
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


  it('Get Value Range Quotes AMOUNT_TTC', () => {
    cy.GET_API_SALES('companies/' + Company + '/value-ranges?entity=QUOTES&prop=AMOUNT_TTC', tt)
      .then(Response => {
        expect(Response.status).to.eq(200)

        cy.log(Response.body)

      })
  })

  it('Get Value Range INVOICES AMOUNT_TTC', () => {
    cy.GET_API_SALES('companies/' + Company + '/value-ranges?entity=INVOICES&prop=AMOUNT_TTC', tt)
      .then(Response => {
        expect(Response.status).to.eq(200)

        cy.log(Response.body)

      })
  })


  it('Get Value Range ARTICLES AMOUNT_TTC', () => {
    cy.GET_API_SALES('companies/' + Company + '/value-ranges?entity=ARTICLES&prop=AMOUNT_TTC', tt)
      .then(Response => {
        expect(Response.status).to.eq(200)

        cy.log(Response.body)

      })
  })


  it('Get Value Range CHECKS AMOUNT_TTC', () => {
    cy.GET_API_SALES('companies/' + Company + '/value-ranges?entity=CHECKS&prop=AMOUNT_TTC', tt)
      .then(Response => {
        expect(Response.status).to.eq(200)

        cy.log(Response.body)

      })
  })


  it('Get Value Range ARTICLE_FAMILIES ARTICLES_QTY', () => {
    cy.GET_API_SALES('companies/' + Company + '/value-ranges?entity=ARTICLE_FAMILIES&prop=ARTICLES_QTY', tt)
      .then(Response => {
        expect(Response.status).to.eq(200)

        cy.log(Response.body)

      })
  })


  it('Get Value Range CLIENT_FAMILIES ARTICLE CLIENTS_QTY', () => {
    cy.GET_API_SALES('companies/' + Company + '/value-ranges?entity=CLIENT_FAMILIES&prop=CLIENTS_QTY', tt)
      .then(Response => {
        expect(Response.status).to.eq(200)

        cy.log(Response.body)

      })
  })

  it('Get Value Range RECURRENCES  AMOUNT_TTC', () => {
    cy.GET_API_SALES('companies/' + Company + '/value-ranges?entity=RECURRENCES&prop=AMOUNT_TTC', tt)
      .then(Response => {
        expect(Response.status).to.eq(200)

        cy.log(Response.body)

      })
  })



})