let tt
let tk
describe('template spec', () => {
  before(() => {
cy.log("rafael")
cy.api("POST", "https://yav2-dev.yesaccount.com/login", {
  "email": "admin@fiducial.com",
  "password": "123"
}).then((response) => {

  tt=(response.body)

  

})
  })

  
  it("GET Suppliers", () => {

    cy.log(tt)



  })
})
