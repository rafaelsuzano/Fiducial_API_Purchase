const { beforeEach } = require('mocha');
const addContext = require('mochawesome/addContext');



let tt
let dt1


let id_suppliers



describe('Suppliers', () => {
  before(() => {
    cy.fixture('supplier.json').then(dt => {
        dt1 = dt;




  cy.api("POST", "https://yav2-dev.yesaccount.com/login", {
      "email": "admin@fiducial.com",
      "password": "123"
    }).then((response) => {

      //tt=JSON.stringify(response.body.token)
      tt = (response.body.token)
    })

  })
})




    it('Get Suppliers ', () => {
    cy.api({
      method: "GET",
      url:  Cypress.env('Url')+"purchases/companies/1/suppliers",
      headers: {
        'Authorization': tt
      },
      failOnStatusCode: false
    }).then(Response => {
      expect(Response.status).to.eq(200)
      //var d =(JSON.stringify(Response.body))
      var d =((Response.body.items))

      
      for (var index in d) {
        id_suppliers=(d[index].id)
        //cy.log(d[index].id)
      }
      cy.addContext("Test get Suppliers")
   

    })
  })    

  it('Get a Supplier List', () => {
    cy.api({
      method: "GET",
      url:  Cypress.env('Url')+"purchases/companies/1/suppliers/"+id_suppliers,
      headers: {
        'Authorization': tt
      },
      failOnStatusCode: false
    }).then(Response => {
      var d =(JSON.stringify(Response.body))
      cy.log(JSON.stringify(d))
 
      expect(Response.status).to.eq(200)
  
      cy.addContext("Test get Suppliers" + id_suppliers)
  })   

})

it('Get Export a Supplier ', () => {
  cy.api({
    method: "GET",
    url: Cypress.env('Url')+"companies/1/suppliers/export",
    headers: {
      'Authorization': tt
    },
    failOnStatusCode: false
  }).then(Response => {
    var d =(JSON.stringify(Response.body))
    cy.log(d)
    expect(Response.status).to.eq(404)

    cy.addContext("Test get Supplier export" )


  })
}) 



  
  it('Post Supplier 201', () => {
   
   cy.Post_API_With_Body('purchases/companies/1/suppliers',tt,dt1['code201'])
  .then (Response => {

    expect(Response.status).to.eq(201);
     
  })

})  

})  

