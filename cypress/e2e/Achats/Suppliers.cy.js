const { beforeEach } = require('mocha');
const addContext = require('mochawesome/addContext');


let Id_Notes
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

describe('Suppliers', () => {
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



  it('Get Suppliers ', () => {
    cy.GET_API('purchases/companies/'+Company+'/suppliers/', tt)
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


  //   cy.Post_API_With_Body('companies/1/suppliers/export',tt)
  it('Get Export a Supplier ', () => {


    cy.GET_API('companies/'+Company+'/suppliers/export', tt)
      .then(Response => {
        var d = (JSON.stringify(Response.body))
        cy.log(d)
        expect(Response.status).to.eq(404)

        cy.addContext("Test get Supplier export")


      })
  })



  it('Post Supplier 201', () => {

    cy.Post_API_With_Body('purchases/companies/'+Company+'/suppliers', tt, dt1['code201'])
      .then(Response => {

        expect(Response.status).to.eq(201);
        cy.log(JSON.stringify(Response.body))
        id_delete = ((Response.body["id"]))
      })

  })


  it('Get a Supplier List', () => {
    cy.GET_API('purchases/companies/'+Company+'/suppliers/' + id_delete, tt)
      .then(Response => {
        var d = (JSON.stringify(Response.body))
        cy.log(JSON.stringify(d))

        expect(Response.status).to.eq(200)

        cy.addContext("Test get Suppliers" + id_suppliers)
      })

  })


  context('Rules', () => {

    it('Post Supplier 400 France', () => {

      cy.Post_API_With_Body('purchases/companies/'+Company+'/suppliers', tt, dt1['code201_France_Not_Siret'])
        .then(Response => {
          cy.log(JSON.stringify(Response.body))
          expect(Response.status).to.eq(400);

          //id_suppliers_france = ((Response.body["id"]))
        })

    })

    

    
    
    
    
    it('Post Supplier 201 France', () => {

      cy.Post_API_With_Body('purchases/companies/'+Company+'/suppliers', tt, dt1['code201_France'])
        .then(Response => {
          cy.log(JSON.stringify(Response.body))
          expect(Response.status).to.eq(201);

          id_suppliers_france = ((Response.body["id"]))
        })

    })


    it('Get data about the siret', () => {
      cy.GET_API('purchases/siret-database/31761525000014', tt)
        .then(Response => {
          expect(Response.status).to.eq(400)
          //var d =(JSON.stringify(Response.body))
  
          cy.log(Response.body)
  
    
  
  
  
        })
    })
    


    it('Post Supplier 201 With contacts', () => {

      cy.Post_API_With_Body('purchases/companies/'+Company+'/suppliers', tt, dt1['Code201SuppliersComplete'])
        .then(Response => {
          cy.log(JSON.stringify(Response.body))
          expect(Response.status).to.eq(201);

          id_suppliers_contacts= ((Response.body["id"]))
        })

    })
  //Code201SupplierspaymentInfo

  it('Post Supplier 201 With paymentInfo', () => {

    cy.Post_API_With_Body('purchases/companies/'+Company+'/suppliers', tt, dt1['Code201SupplierspaymentInfo'])
      .then(Response => {
        cy.log(JSON.stringify(Response.body))
        expect(Response.status).to.eq(201);

        id_suppliers_paymentInfo= ((Response.body["id"]))
      })

  })



    it('Post Supplier 403 Invalid Token', () => {

      cy.Post_API_With_Body('purchases/companies/'+Company+'/suppliers', "555", dt1['code201_France'])
        .then(Response => {
          cy.log(JSON.stringify(Response.body))
          expect(Response.status).to.eq(403);

        })

    })


    it('Post Supplier 401 Not Authorized', () => {

      cy.Post_API_With_Body('purchases/companies/'+Company+'/suppliers', "Bearer eJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBmaWR1Y2lhbC5jb20iLCJleHAiOjE2ODc4NjIyODAsInR5cGUiOiJGQUNJTElBIn0.eO8UAdnxQ7YvDez-F3IuCOg3jvF6mEsPbTcpxNXNchiBzA7MOhy-_zexgC4nWhV-Ysqh7KbXEjUwvCf4PexmuA", dt1['code201_France'])
        .then(Response => {
          cy.log(JSON.stringify(Response.body))
          expect(Response.status).to.eq(401);

        })

    })

    it('Post Supplier 404 Not Found', () => {

      cy.Post_API_With_Body('purchases/companies/'+Company+'/supplier', tt, dt1['code201_France'])
        .then(Response => {
          cy.log(JSON.stringify(Response.body))
          expect(Response.status).to.eq(404);

        })

    })
    it('Post Supplier 400 Malformaed', () => {

      cy.Post_API_With_Body('purchases/companies/'+Company+'/suppliers', tt, dt1['code400_Malformed'])
        .then(Response => {
          cy.log(JSON.stringify(Response.body))
          expect(Response.status).to.eq(400);

        })

    })

  })


  it('Delete Supplier 201', () => {

    cy.DELETE_API('purchases/companies/'+Company+'/suppliers/' + id_delete, tt)
      .then(Response => {

        expect(Response.status).to.eq(204);
        cy.log(JSON.stringify(Response.body))
        id_delete = ((Response.body["id"]))
      })

  })


})



describe('Supplier Notes', () => {
  // fazer before para pegar id de novo suplier

  before(() => {

    cy.Post_API_With_Body('purchases/companies/'+Company+'/suppliers', tt, dt1['code201'])
      .then(Response => {

        expect(Response.status).to.eq(201);
        cy.log(JSON.stringify(Response.body))
        ID_TESTE = ((Response.body["id"]))
      })



  })
  it('Get Supplier Families List Notes', () => {
    cy.GET_API('purchases/companies/'+Company+'/suppliers/' + ID_TESTE + '/notes', tt)
      .then(Response => {
        var d = (JSON.stringify(Response.body))
        cy.log(JSON.stringify(d))

        expect(Response.status).to.eq(200)

        cy.addContext("Test get Supplier Family")
      })

    })
  it('Post Supplier Families List Notes 201', () => {
      cy.Post_API_With_Body('purchases/companies/'+Company+'/suppliers/' + ID_TESTE + '/notes', tt,dt1['code201_notes'])
        .then(Response => {
          Id_Notes = ((Response.body.id))
            cy.log(Id_Notes)
    
            expect(Response.status).to.eq(201)
    
            cy.addContext("Test get Supplier Family")
          })
    
      })
  it('Get a Supplier Note', () => {
        cy.GET_API('purchases/companies/'+Company+'/suppliers/' + ID_TESTE + '/notes/'+Id_Notes, tt)
          .then(Response => {
            var d = (JSON.stringify(Response.body))
            cy.log(JSON.stringify(d))
    
            expect(Response.status).to.eq(200)
    
            cy.addContext("Test get Supplier Family")
          })
        
        })

  it('Update a Supplier Note', () => {


          cy.api({
            method: "PUT",
            url: Cypress.env('url_achats') + 'purchases/companies/'+Company+'/suppliers/' + ID_TESTE + '/notes/'+Id_Notes,
            body: {
              
            "note": Id_Notes,
            "title": "UPDATE AUTOMACAO"
      
            },
        
        
        
            headers: {
              'Authorization': tt
            },
        
        
            failOnStatusCode: false
          }).then(Response => {
        
            expect(Response.status).to.eq(200)
    
        
          })
        
        
        })      
  it('Delete a Supplier Note', () => {


          cy.api({
            method: "DELETE",
            url: Cypress.env('url_achats') + 'purchases/companies/'+Company+'/suppliers/' + ID_TESTE + '/notes/'+Id_Notes,
             
        
            headers: {
              'Authorization': tt
            },
        
        
            failOnStatusCode: false
          }).then(Response => {
        
            expect(Response.status).to.eq(200)
    
        
          })
        
        
        })    


      })

describe('Delete Data', () => {

  before(() =>{
  cy.DELETE_API('purchases/companies/'+Company+'/suppliers/' + ID_TESTE, tt)
  cy.DELETE_API('purchases/companies/'+Company+'/suppliers/' + id_suppliers_france, tt)
  cy.DELETE_API('purchases/companies/'+Company+'/suppliers/' + id_suppliers_contacts, tt)
  cy.DELETE_API('purchases/companies/'+Company+'/suppliers/' + id_suppliers_paymentInfo, tt)



})


  // fazer before para pegar id de novo suplier
  it('Get documents references list 400', () => {
    cy.GET_API('ocr/documents-references', tt)
      .then(Response => {
        Id_Notes = (JSON.stringify(Response.body.id))
        cy.log(JSON.stringify(Id_Notes))
          
        expect(Response.status).to.eq(400)

        cy.addContext("Test get Supplier Family")
      })

  })

})