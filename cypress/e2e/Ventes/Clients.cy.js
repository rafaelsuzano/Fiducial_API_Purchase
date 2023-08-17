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




    it.skip('Get_ExportClients_Excel Separtor COMMA 200', () => {

        cy.GET_API_SALES('companies/' + Company + '/clients/export?companyId=' + Company + '&exportFile%5Btype%5D=CSV&exportFile%5Bseparator%5D=COMMA', tt)
            .then(Response => {
                cy.wait(4000)
                expect(Response.status).to.eq(200)
                //var d =(JSON.stringify(Response.body))

                cy.log(Response.body)

            })


    })




    it.skip('Get_ExportClients_Excel 200', () => {

        cy.GET_API_SALES('companies/2/clients/export?companyId=2&exportFile%5Btype%5D=EXCEL', tt)
            .then(Response => {
                expect(Response.status).to.eq(200)



                console.log(Response.body);

            })
    })





    it.skip('Get_ExportClients_Excel exportFile 403', () => {
        defaultCommandTimeout: 50000
        cy.GET_API_SALES('companies/' + Company + '/clients/export?companyId=' + Company + '&exportFile%5Btype%5D=CSV&exportFile%5Bseparator%5D=', tt)
            .then(Response => {
                expect(Response.status).to.eq(400)
                //var d =(JSON.stringify(Response.body))

                console.log(Response.body);
            })

    })

    it('Client registration France 201', () => {
        cy.Post_API_With_Body_SALES('companies/' + Company + '/clients', tt, dt1['code201_FRANCE'])
            .then(Response => {
                cy.log(JSON.stringify(Response.body))
                //cy.log(Response.body)

                expect(Response.status).to.eq(201);
                id_client = ((Response.body["id"]))

            })

    })

    it('Client registration without_contact_email', () => {
        cy.Post_API_With_Body_SALES('companies/' + Company + '/clients', tt, dt1['code201_FRANCE_Contato_Sem_Email'])
            .then(Response => {
                cy.log(JSON.stringify(Response.body))
                //cy.log(Response.body)

                expect(Response.status).to.eq(400);
                //        id_client = ((Response.body["id"]))

            })

    })




    //Client_registration_without_city
    it('Client registration without_contact_city', () => {
        cy.Post_API_With_Body_SALES('companies/' + Company + '/clients', tt, dt1['code201_FRANCE_Contato_Sem_city'])
            .then(Response => {
                cy.log(JSON.stringify(Response.body))
                //cy.log(Response.body)

                expect(Response.status).to.eq(400);
                //        id_client = ((Response.body["id"]))

            })

    })

    it('Client registration Clients_TOKEN_NOK', () => {
        cy.Post_API_With_Body_SALES('companies/' + Company + '/clients', "aa", dt1['code201_FRANCE_Contato_Sem_city'])
            .then(Response => {
                cy.log(JSON.stringify(Response.body))
                //cy.log(Response.body)

                expect(Response.status).to.eq(403);
                //        id_client = ((Response.body["id"]))

            })

    })

    it('Get_Client ', () => {
        defaultCommandTimeout: 50000
        cy.GET_API_SALES('companies/' + Company + '/clients/'  + id_client , tt)
            .then(Response => {
                console.log(Response.body);
                expect(Response.status).to.eq(200)
                //var d =(JSON.stringify(Response.body))

                  })

    })
    
    it('Get_Client List ', () => {
        defaultCommandTimeout: 50000
        cy.GET_API_SALES('companies/' + Company + '/clients/' , tt)
            .then(Response => {
                console.log(Response.body);
                expect(Response.status).to.eq(200)
                //var d =(JSON.stringify(Response.body))

              
            })

    })   
        



})

