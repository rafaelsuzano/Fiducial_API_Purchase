import addContext from "mochawesome/addContext"

Cypress.Commands.add('GetToken',function()
{
  let t
  cy.api("POST", "https://yav2-dev.yesaccount.com/login", {
        "email": "admin@fiducial.com",
        "password": "123"
      }).then((response) => {
       // t=JSON.stringify(response.body['token'])
       t=(response.body.token)
        return  t
})
})



Cypress.Commands.add("addContext", (context) => {
  cy.once("test:after:run", (test) => addContext({ test }, context))
})




Cypress.Commands.add('Post_API_With_Body',(Endpoint,Token,pBody)=>

 
  cy.api({
    method: "POST",
    url: Cypress.env('Url')+Endpoint,
    body: pBody,
    
    
    headers: {
      'Authorization': Token
    },
    failOnStatusCode: false
  }).then(Response => {return Response})
)





Cypress.Commands.add('GET_API',(Endpoint,Token)=>

 
  cy.api({
    method: "GET",
    url: Cypress.env('Url')+Endpoint,

        
    headers: {
      'Authorization': Token
    },
    failOnStatusCode: false
  }).then(Response => {return Response})
)




Cypress.Commands.add('DELETE_API',(Endpoint,Token)=>

 
  cy.api({
    method: "DELETE",
    url: Cypress.env('Url')+Endpoint,

        
    headers: {
      'Authorization': Token
    },
    failOnStatusCode: false
  }).then(Response => {return Response})
)

// match specified selector
Cypress.Commands.add('getBySel', (selector, ...args) => {
  return cy.get(`[data-test=${selector}]`, ...args)
})

//contains specified selector
Cypress.Commands.add('getBySelLike', (selector, ...args) => {
  return cy.get(`[data-test*=${selector}]`, ...args)
})

Cypress.Commands.add('login', (data) => {
  cy.intercept("POST", "/login").as("loginUser");
  cy.visit('/');
  cy.getBySel("login-form-email").type(data.email, {log: false});
  cy.getBySel("login-form-password").type(data.password, {log: false});
  cy.getBySel("login-form-submit").click();
  cy.wait('@loginUser').its('response.statusCode').should('eq', 200);
  cy.getBySel("logout-button").should('be.visible');
})