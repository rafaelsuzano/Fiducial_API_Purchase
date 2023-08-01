const { beforeEach } = require('mocha');
const addContext = require('mochawesome/addContext');



let tt
let dt1
let id_client


let Company = Cypress.env("companyId")

describe('Clients', () => {
    before(() => {
        cy.fixture('clients.json').then(dt => {
            dt1 = dt;




            cy.api("POST", Cypress.env('Login'), {
                "email": "sad@fiducial.net",
                "password": "1234"
            }).then((response) => {

                //tt=JSON.stringify(response.body.token)
                tt = (response.body.token)
            })

        })
    })




    it('C376: Get_Client ', () => {
        defaultCommandTimeout: 50000
        cy.GET_API_SALES('companies/' + Company + '/clients/', tt)
            .then(Response => {
                console.log(Response.body);
                expect(Response.status).to.eq(200)
                //var d =(JSON.stringify(Response.body))

                  })

    })


    })
