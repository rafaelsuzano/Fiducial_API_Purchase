const { beforeEach } = require('mocha');
const addContext = require('mochawesome/addContext');



let tt
let dt1



let Company = Cypress.env("companyId")

describe('SiretDataBase', () => {
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




  it('Get data about the siret', () => {
    cy.GET_API('purchases/siret-database/31761525000014', tt)
      .then(Response => {
      
        //var d =(JSON.stringify(Response.body))

        cy.log(Response.body)
        expect(Response.status).to.eq(200)
  

      })

      })
  
  
  it('Get data about the not siret ', () => {
    cy.GET_API('purchases/siret-database/31761525000015', tt)
          .then(Response => {
          
            //var d =(JSON.stringify(Response.body))
    
            cy.log(Response.body)
            expect(Response.status).to.eq(200)
      
    
    
    
          })    


  })
})
