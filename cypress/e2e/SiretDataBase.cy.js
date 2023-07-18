const { beforeEach } = require('mocha');
const addContext = require('mochawesome/addContext');



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




  it('Get data about the siret', () => {
    cy.GET_API('purchases/siret-database/542084454', tt)
      .then(Response => {
        expect(Response.status).to.eq(200)
        //var d =(JSON.stringify(Response.body))
        var d = ((Response.body.items))


        for (var index in d) {
          id_suppliers = (d[index].id)
          //cy.log(d[index].id)
        }



      })
  })
})