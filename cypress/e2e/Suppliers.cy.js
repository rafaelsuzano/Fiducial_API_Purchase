const { beforeEach } = require('mocha');
const addContext = require('mochawesome/addContext');



let tt
let dt1
let id_delete

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


//GET_API

    it('Get Suppliers ', () => {
      cy.GET_API('purchases/companies/1/suppliers/',tt)
      .then(Response => {
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
    cy.GET_API('purchases/companies/1/suppliers/'+id_suppliers,tt)
    .then(Response => {
      var d =(JSON.stringify(Response.body))
      cy.log(JSON.stringify(d))
 
      expect(Response.status).to.eq(200)
  
      cy.addContext("Test get Suppliers" + id_suppliers)
  })   

})
//   cy.Post_API_With_Body('companies/1/suppliers/export',tt)
  it('Get Export a Supplier ', () => {
  
  
    cy.GET_API('companies/1/suppliers/export',tt)
    .then(Response => {
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
    cy.log(JSON.stringify(Response.body)) 
    id_delete=(JSON.stringify(Response.body["id"])) 
  })

})  



it('Delete Supplier 201', () => {
   
  cy.DELETE_API('purchases/companies/1/suppliers/'+id_suppliers,tt)
 .then (Response => {

   expect(Response.status).to.eq(204);
   cy.log(JSON.stringify(Response.body)) 
   id_delete=(JSON.stringify(Response.body["id"])) 
 })

})  


}) 



describe('Supplier Family', () => {

  it('Get Supplier Families List', () => {
    cy.GET_API('purchases/companies/1/supplier-families',tt)
    .then(Response => {
      var d =(JSON.stringify(Response.body))
      cy.log(JSON.stringify(d))
 
      expect(Response.status).to.eq(200)
  
      cy.addContext("Test get Supplier Family" )
  })   

})
    it('Export Supplier Families ', () => {
      
      
      cy.GET_API('purchases/companies/1/supplier-families/export',tt)
      .then(Response => {
      var d =(JSON.stringify(Response.body))
      cy.log(d)
      expect(Response.status).to.eq(404)

      cy.addContext("Test get Supplier export" )


})
}) 




}) 

describe('Supplier Notes', () => {

  it('Get Supplier Families List', () => {
    cy.GET_API('purchases/companies/1/suppliers/'+id_suppliers+'/notes',tt)
    .then(Response => {
      var d =(JSON.stringify(Response.body))
      cy.log(JSON.stringify(d))
 
      expect(Response.status).to.eq(200)
  
      cy.addContext("Test get Supplier Family" )
  })   

})

})