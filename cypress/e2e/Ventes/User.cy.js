const { beforeEach } = require('mocha');
const addContext = require('mochawesome/addContext');



let tt
let dt1
let id_client


let Company = Cypress.env("companyId")

describe('Get Users', () => {
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




    it('Get_User', () => {

        cy.GET_API_SALES('companies/' + Company + '/users' , tt)
            .then(Response => {
                expect(Response.status).to.eq(200)
                //var d =(JSON.stringify(Response.body))

                cy.log(Response.body)

            })


    })



            })

