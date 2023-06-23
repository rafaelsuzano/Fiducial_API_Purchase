let tt
let r
let result
describe('Suppliers', () => {
  before(function () {

    cy.api("POST", "https://yav2-dev.yesaccount.com/login", {
      "email": "admin@fiducial.com",
      "password": "123"
    }).then((response) => {

      //tt=JSON.stringify(response.body.token)
      tt = (response.body.token)


    })




  })




  context('GET',() =>{
    it('Get Suppliers List', () => {
    cy.api({
      method: "GET",
      url: "https://purchases-dev.yesaccount.com/purchases/companies/1/suppliers",
      headers: {
        'Authorization': tt
      },
      failOnStatusCode: false
    }).then(Response => {
      expect(Response.status).to.eq(200)

    })
  })    

  it('Get a Supplier', () => {
    cy.api({
      method: "GET",
      url: "https://purchases-dev.yesaccount.com/purchases/companies/1/suppliers",
      headers: {
        'Authorization': tt
      },
      failOnStatusCode: false
    }).then(Response => {
      var d =(JSON.stringify(Response.body.items))
      cy.log(d)


      expect(Response.status).to.eq(200)
  
    })
  })   
  


})
})
