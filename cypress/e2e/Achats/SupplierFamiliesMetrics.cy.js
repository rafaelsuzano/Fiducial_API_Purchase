const { beforeEach } = require('mocha');
const addContext = require('mochawesome/addContext');



let tt
let dt1
let dt
let id_suppliers_Family

let Company = Cypress.env("companyId")

describe('Supplier Families Metrics', () => {
  before(() => {
    cy.fixture('SupplierFamily').then(dt => {
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

  it('Post Supplier Family 201', () => {

    cy.Post_API_With_Body('purchases/companies/' + Company + '/supplier-families', tt, dt1['code201'])
        .then(Response => {

            expect(Response.status).to.eq(201);
            cy.log(JSON.stringify(Response.body))
            id_suppliers_Family= ((Response.body["id"]))
            cy.log(id_suppliers_Family)
       
        })

})



  it('Get total amount of invoices by exercise month', () => {
    cy.GET_API( 'purchases/companies/'+ Company + '/supplier-families/metrics/invoices/exercise-amount-monthly?supplierFamilyId=' + id_suppliers_Family, tt)
      .then(Response => {
        expect(Response.status).to.eq(200)
        //var d =(JSON.stringify(Response.body))

        cy.log(Response.body)

  



      })
  })






  it('Get total amount of invoices  exercise year', () => {
    cy.GET_API( 'purchases/companies/'+ Company + '/suppliers/metrics/invoices/exercise-amount-yearly?supplierFamilyId=' + id_suppliers_Family, tt)
      .then(Response => {
        expect(Response.status).to.eq(200)
        //var d =(JSON.stringify(Response.body))

        cy.log(Response.body)



      })
  })


  it('Get total amount of invoices family by exercise year', () => {
    cy.GET_API( 'purchases/companies/'+ Company + '/supplier-families/metrics/invoices/exercise-amount-yearly?supplierFamilyId=' + id_suppliers_Family, tt)
      .then(Response => {
        expect(Response.status).to.eq(200)
        //var d =(JSON.stringify(Response.body))

        cy.log(Response.body)

        })
      })



 
      it('Get total amount of invoices family civil year(monthly)', () => {
    cy.GET_API( 'purchases/companies/'+ Company + '/supplier-families/metrics/invoices/civil-year-amount-monthly?supplierFamilyId=' + id_suppliers_Family, tt)
      .then(Response => {
        expect(Response.status).to.eq(200)
        //var d =(JSON.stringify(Response.body))

        cy.log(Response.body)


      })
  })


  it('Get total amount of invoices civil year (January 1st to December 31st)', () => {
    cy.GET_API( 'purchases/companies/'+ Company + '/supplier-families/metrics/invoices/civil-year-amount-yearly?supplierFamilyId=' + id_suppliers_Family, tt)
      .then(Response => {
        expect(Response.status).to.eq(200)
        //var d =(JSON.stringify(Response.body))

        cy.log(Response.body)


      })
  })

  it('Get total amount of invoices for the last 12 months', () => {
    cy.GET_API( 'purchases/companies/'+ Company + '/supplier-families/metrics/invoices/amount-monthly?supplierFamilyId=' + id_suppliers_Family, tt)
      .then(Response => {
        expect(Response.status).to.eq(200)
        //var d =(JSON.stringify(Response.body))

        cy.log(Response.body)

      })
  })

  it('Delete suppliers families', () => {    
    cy.DELETE_API('purchases/companies/'+ Company +'/supplier-families/'+id_suppliers_Family, tt)


       
        })

})




