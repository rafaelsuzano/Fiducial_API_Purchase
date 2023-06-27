const { beforeEach } = require('mocha');
const addContext = require('mochawesome/addContext');



let tt
let dt1
let id_delete

let id_suppliers
let dt_Family
let id_suppliers_france



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

context('Rules', () => {

  it('Post Supplier 201 France', () => {
   
    cy.Post_API_With_Body('purchases/companies/1/suppliers',tt,dt1['code201_France'])
   .then (Response => {
    cy.log(JSON.stringify(Response.body)) 
     expect(Response.status).to.eq(201);

     id_suppliers_france=((Response.body["id"])) 
   })
  
  })   


  it('Post Supplier 403 Invalid Token', () => {
   
    cy.Post_API_With_Body('purchases/companies/1/suppliers',"555",dt1['code201_France'])
   .then (Response => {
    cy.log(JSON.stringify(Response.body)) 
     expect(Response.status).to.eq(403);

   })
  
  })  


  it('Post Supplier 401 Not Authorized', () => {
   
    cy.Post_API_With_Body('purchases/companies/1/suppliers',"Bearer eJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBmaWR1Y2lhbC5jb20iLCJleHAiOjE2ODc4NjIyODAsInR5cGUiOiJGQUNJTElBIn0.eO8UAdnxQ7YvDez-F3IuCOg3jvF6mEsPbTcpxNXNchiBzA7MOhy-_zexgC4nWhV-Ysqh7KbXEjUwvCf4PexmuA",dt1['code201_France'])
   .then (Response => {
    cy.log(JSON.stringify(Response.body)) 
     expect(Response.status).to.eq(401);

   })
  
  })  

  it('Post Supplier 404 Not Found', () => {
   
    cy.Post_API_With_Body('purchases/companies/1/supplier',tt,dt1['code201_France'])
   .then (Response => {
    cy.log(JSON.stringify(Response.body)) 
     expect(Response.status).to.eq(404);

   })
  
  })  
  it('Post Supplier 400 Malformaed', () => {
   
    cy.Post_API_With_Body('purchases/companies/1/suppliers',tt,dt1['code400_Malformed'])
   .then (Response => {
    cy.log(JSON.stringify(Response.body)) 
     expect(Response.status).to.eq(400);

   })
  
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

  before(() => {
    cy.fixture('family.json').then(dtFamily => {
        dt_Family = dtFamily;
 
      })
 })
 
 it('Get Supplier Family 200', () => {
   
  cy.GET_API('purchases/companies/1/supplier-families',tt)
 .then (Response => {

   expect(Response.status).to.eq(200);
   cy.log(JSON.stringify(Response.body)) 

 })

})  




 it('Post Supplier Family 201', () => {
   
  cy.Post_API_With_Body('purchases/companies/1/supplier-families',tt,dt_Family['code201'])
 .then (Response => {

   expect(Response.status).to.eq(201);
   cy.log(JSON.stringify(Response.body)) 
   id_suppliers_france=((Response.body["id"])) 
 })

})  

 
 
 
 
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
      expect(Response.status).to.eq(405)

      cy.addContext("Test get Supplier export" )


})
}) 

  it('Delete Supplier 201', () => {
    
    cy.DELETE_API('purchases/companies/1/supplier-families/97',tt)
  .then (Response => {

    expect(Response.status).to.eq(204);
    cy.log(JSON.stringify(Response.body)) 
    id_delete=(JSON.stringify(Response.body["id"])) 
  })

  })  


}) 

describe('Supplier Notes', () => {
// fazer before para pegar id de novo suplier
  it('Get Supplier Families List', () => {
    cy.GET_API('purchases/companies/1/suppliers/'+id_suppliers_france+'/notes',tt)
    .then(Response => {
      var d =(JSON.stringify(Response.body))
      cy.log(JSON.stringify(d))
 
      expect(Response.status).to.eq(200)
  
      cy.addContext("Test get Supplier Family" )
  })   

})

})