const { beforeEach } = require('mocha');
const addContext = require('mochawesome/addContext');



let tt
let dt1
let documentReferenceId


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

  context('Get Status', () => {
    it('Get documents references list TO_VALIDATE', () => {
      cy.GET_API('ocr/documents-references?status=TO_VALIDATE', tt)
        .then(Response => {
          expect(Response.status).to.eq(200)



          cy.log((JSON.stringify(Response.body)))



        })
    })



    it('Get documents references list NOT_PROCESSED', () => {
      cy.GET_API('ocr/documents-references?status=NOT_PROCESSED', tt)
        .then(Response => {
          expect(Response.status).to.eq(200)

          cy.log((JSON.stringify(Response.body)))


        })
    })





    it('Get documents references list IN_PROCESS', () => {
      cy.GET_API('ocr/documents-references?status=IN_PROCESS', tt)
        .then(Response => {
          expect(Response.status).to.eq(200)


          cy.log((JSON.stringify(Response.body)))


        })
    })



    it('Get documents references list PROCESSED', () => {
      cy.GET_API('ocr/documents-references?status=PROCESSED', tt)
        .then(Response => {
          expect(Response.status).to.eq(200)



          cy.log((JSON.stringify(Response.body)))




        })
    })


    it('Get documents references list REFUSED', () => {
      cy.GET_API('ocr/documents-references?status=REFUSED', tt)
        .then(Response => {
          expect(Response.status).to.eq(200)


          cy.log((JSON.stringify(Response.body)))



        })
    })


    it('Get documents references list ACCEPTED', () => {
      cy.GET_API('ocr/documents-references?status=ACCEPTED', tt)
        .then(Response => {
          expect(Response.status).to.eq(200)


          cy.log((JSON.stringify(Response.body)))



        })
    })


    it('Get the nex document to be process', () => {
      cy.GET_API('ocr/documents/next_to_process', tt)
        .then(Response => {
          expect(Response.status).to.eq(200)


          cy.log((JSON.stringify(Response.body)))



        })
    })


  })



  context(' e2e OCR', () => {
    it('Create a new Document', () => {


      cy.api({
        method: "POST",
        url: Cypress.env('url_achats') + 'ocr/new-document',
        body: {
          "companyId": Cypress.env('companyId'),
          "base64": Cypress.env('Pbody_Base64'),

          "fileName": "teste.pdf"
        },


        failOnStatusCode: false
      }).then(Response => {

        expect(Response.status).to.eq(201)
        documentReferenceId = ((Response.body.documentReferenceId))
        documentReferenceId = Response.body.documentReferenceId

        cy.log(documentReferenceId)
      })


    })
    it('Get a document', () => {
      cy.GET_API('ocr/document/' + documentReferenceId, tt)
        .then(Response => {
          expect(Response.status).to.eq(200)


          cy.log((JSON.stringify(Response.body)))



        })
    })

    it('Save OCR processed document with metadata', () => {


      cy.api({
        method: "POST",
        url: Cypress.env('url_achats') + 'ocr/documents',
        body: {


          "documentReferenceId": documentReferenceId,

          "base64": Cypress.env('Pbody_Base64'),

          "fileName": "teste.pdf"
        },


        failOnStatusCode: false
      }).then(Response => {

        expect(Response.status).to.eq(201)

        documentReferenceId = ((Response.body.documentReferenceId))
        documentReferenceId = Response.body.documentReferenceId

        cy.log(documentReferenceId)
      })


    })



    it('Update the document metadata_TO_VALIDATE', () => {


      cy.api({
        method: "PUT",
        url: Cypress.env('url_achats') + 'ocr/document-metadata/' + documentReferenceId,
        body: {



          "documentReferenceId": documentReferenceId,
          "status": "TO_VALIDATE",
          "type": "INVOICE",
          "siret": "34518442800018",
          "supplierName": "string",
          "mainCode": "string",
          "documentDate": "2023-02-24T00:00:00Z",
          "documentNumber":  Math.random(),
          "currency": "EUR",
          "amountTTC": 0,
          "paymentTerms": [
            {
              "dueDate": "2023-02-24T00:00:00Z",
              "amountTTC": 0,
              "amountAlreadyPaid": 0,
              "amountMissingPayment": 0,
              "paymentDate": "2023-02-24T00:00:00Z"
            }
          ],
          "comments": "TESTE AUTOMATICO"
        },



        headers: {
          'Authorization': tt
        },


        failOnStatusCode: false
      }).then(Response => {

        expect(Response.status).to.eq(200)

        documentReferenceId = ((Response.body.documentReferenceId))
        documentReferenceId = Response.body.documentReferenceId

        cy.log(documentReferenceId)
      })


    })



    it('Accept a document ', () => {
      /// status TO_VALIDATE
     
           cy.api({
             method: "POST",
             url: Cypress.env('url_achats') + 'ocr/document/' + documentReferenceId + '/accept',
             body: {
     
     
               "documentReferenceId": documentReferenceId,
     
               "base64": Cypress.env('Pbody_Base64'),
     
               "fileName": "teste.pdf"
             },
     
             headers: {
               'Authorization': tt
             },
     
     
             failOnStatusCode: false
           }).then(Response => {
     
             expect(Response.status).to.eq(200)

     
             cy.log(documentReferenceId)
           })
     
     
         })
     
         it('Refuse a document', () => {
     
     
           cy.api({
             method: "POST",
             url: Cypress.env('url_achats') + 'ocr/document/' + documentReferenceId + '/refuse',
             body: {
     
     
               "documentReferenceId": documentReferenceId,
     
               "base64": Cypress.env('Pbody_Base64'),
     
               "fileName": "teste.pdf"
             },
     
             headers: {
               'Authorization': tt
             },
     
     
             failOnStatusCode: false
           }).then(Response => {
     
             expect(Response.status).to.eq(200)
     
          
     
             cy.log(documentReferenceId)
           })
     
     
         })




    it('Update the document metadata_IN_PROCESS', () => {


      cy.api({
        method: "PUT",
        url: Cypress.env('url_achats') + 'ocr/document-metadata/' + documentReferenceId,
        body: {



          "documentReferenceId": documentReferenceId,
          "status": "IN_PROCESS",
          "type": "INVOICE",
          "siret": "34518442800018",
          "supplierName": "string",
          "mainCode": "string",
          "documentDate": "2023-02-24T00:00:00Z",
          "documentNumber": Math.random(),
          "currency": "EUR",
          "amountTTC": 0,
          "paymentTerms": [
            {
              "dueDate": "2023-02-24T00:00:00Z",
              "amountTTC": 0,
              "amountAlreadyPaid": 0,
              "amountMissingPayment": 0,
              "paymentDate": "2023-02-24T00:00:00Z"
            }
          ],
          "comments": "TESTE AUTOMATICO"
        },



        headers: {
          'Authorization': tt
        },


        failOnStatusCode: false
      }).then(Response => {

        expect(Response.status).to.eq(200)

        documentReferenceId = ((Response.body.documentReferenceId))
        documentReferenceId = Response.body.documentReferenceId

        cy.log(documentReferenceId)
      })


    })


    it('Update the document metadata_PROCESSED', () => {


      cy.api({
        method: "PUT",
        url: Cypress.env('url_achats') + 'ocr/document-metadata/' + documentReferenceId,
        body: {



          "documentReferenceId": documentReferenceId,
          "status": "PROCESSED",
          "type": "INVOICE",
          "siret": "34518442800018",
          "supplierName": "string",
          "mainCode": "string",
          "documentDate": "2023-02-24",
          "documentNumber":  Math.random(),
          "currency": "EUR",
          "amountTTC": 0,
          "paymentTerms": [
            {
              "dueDate": "2023-02-24T00:00:00Z",
              "amountTTC": 0,
              "amountAlreadyPaid": 0,
              "amountMissingPayment": 0,
              "paymentDate": "2023-02-24T00:00:00Z"
            }
          ],
          "comments": "TESTE AUTOMATICO"
        },



        headers: {
          'Authorization': tt
        },


        failOnStatusCode: false
      }).then(Response => {

        expect(Response.status).to.eq(200)

        documentReferenceId = ((Response.body.documentReferenceId))
        documentReferenceId = Response.body.documentReferenceId

        cy.log(documentReferenceId)
      })


    })


    it('Update the document metadata_REFUSED', () => {


      cy.api({
        method: "PUT",
        url: Cypress.env('url_achats') + 'ocr/document-metadata/' + documentReferenceId,
        body: {



          "documentReferenceId": documentReferenceId,
          "status": "REFUSED",
          "type": "INVOICE",
          "siret": "34518442800018",
          "supplierName": "string",
          "mainCode": "string",
          "documentDate": "2023-02-24",
          "documentNumber": Math.random(),
          "currency": "EUR",
          "amountTTC": 0,
          "paymentTerms": [
            {
              "dueDate": "2023-02-24T00:00:00Z",
              "amountTTC": 0,
              "amountAlreadyPaid": 0,
              "amountMissingPayment": 0,
              "paymentDate": "2023-02-24T00:00:00Z"
            }
          ],
          "comments": "TESTE AUTOMATICO"
        },



        headers: {
          'Authorization': tt
        },


        failOnStatusCode: false
      }).then(Response => {

        expect(Response.status).to.eq(200)

        documentReferenceId = ((Response.body.documentReferenceId))
        documentReferenceId = Response.body.documentReferenceId

        cy.log(documentReferenceId)
      })


    })
    it('Update the document metadata_ACCEPTED', () => {


      cy.api({
        method: "PUT",
        url: Cypress.env('url_achats') + 'ocr/document-metadata/' + documentReferenceId,
        body: {



          "documentReferenceId": documentReferenceId,
          "status": "ACCEPTED",
          "type": "INVOICE",
          "siret": "string",
          "supplierName": "string",
          "mainCode": "string",
          "documentDate": "2023-02-24",
          "documentNumber":  Math.random(),
          "currency": "EUR",
          "amountTTC": 0,
          "paymentTerms": [
            {
              "dueDate": "2023-02-24T00:00:00Z",
              "amountTTC": 0,
              "amountAlreadyPaid": 0,
              "amountMissingPayment": 0,
              "paymentDate": "2023-02-24T00:00:00Z"
            }
          ],
          "comments": "TESTE AUTOMATICO"
        },



        headers: {
          'Authorization': tt
        },


        failOnStatusCode: false
      }).then(Response => {

        expect(Response.status).to.eq(200)

        documentReferenceId = ((Response.body.documentReferenceId))
        documentReferenceId = Response.body.documentReferenceId

        cy.log(documentReferenceId)
      })


    })

    it('Update the document metadata_NOT_PROCESSED', () => {


      cy.api({
        method: "PUT",
        url: Cypress.env('url_achats') + 'ocr/document-metadata/' + documentReferenceId,
        body: {



          "documentReferenceId": documentReferenceId,
          "status": "NOT_PROCESSED",
          "type": "INVOICE",
          "siret": "34518442800018",
          "supplierName": "string",
          "mainCode": "string",
          "documentDate": "2023-02-24",
          "documentNumber":  Math.random(),
          "currency": "EUR",
          "amountTTC": 0,
          "paymentTerms": [
            {
              "dueDate": "2023-02-24T00:00:00Z",
              "amountTTC": 0,
              "amountAlreadyPaid": 0,
              "amountMissingPayment": 0,
              "paymentDate": "2023-02-24T00:00:00Z"
            }
          ],
          "comments": "TESTE AUTOMATICO"
        },



        headers: {
          'Authorization': tt
        },


        failOnStatusCode: false
      }).then(Response => {

        expect(Response.status).to.eq(200)

        documentReferenceId = ((Response.body.documentReferenceId))
        documentReferenceId = Response.body.documentReferenceId

        cy.log(documentReferenceId)
      })


    })



  })

})



