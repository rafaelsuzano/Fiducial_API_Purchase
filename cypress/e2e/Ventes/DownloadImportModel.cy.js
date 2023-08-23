const { beforeEach } = require('mocha');
const addContext = require('mochawesome/addContext');



let tt
let dt1



let Company = Cypress.env("companyId")

describe('DownloadImportModel', () => {
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




  it('Get download-import-model CLIENTS', () => {
    cy.GET_API_SALES('common/download-import-model?type=CLIENTS', tt)
      .then(Response => {
        expect(Response.status).to.eq(200)







      })
  })

  it('Get download-import-model ARTICLES', () => {
    cy.GET_API_SALES('common/download-import-model?type=ARTICLES', tt)
      .then(Response => {
        expect(Response.status).to.eq(200)







      })
  })


})