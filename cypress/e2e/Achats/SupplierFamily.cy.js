const { beforeEach } = require('mocha');
const addContext = require('mochawesome/addContext');



let tt
let dt1
let id_suppliers_Family

let Company = Cypress.env("companyId")

describe('Suppliers Family', () => {
    before(() => {
        cy.fixture('SupplierFamily.json').then(dt => {
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


    it('Post Supplier Family 201', () => {

        cy.Post_API_With_Body('purchases/companies/' + Company + '/supplier-families', tt, dt1['code201'])
            .then(Response => {

                expect(Response.status).to.eq(201);
                cy.log(JSON.stringify(Response.body))
                id_suppliers_Family= ((Response.body["id"]))
           
            })

    })

    it('Get Supplier Family  200', () => {

        cy.GET_API('purchases/companies/' + Company + '/supplier-families/'+ id_suppliers_Family, tt)
            .then(Response => {
    
                expect(Response.status).to.eq(200);
                cy.log(JSON.stringify(Response.body))
                id_suppliers_Family= ((Response.body["id"]))
           
            })
    
    })


it('Get List Supplier Family 200', () => {

    cy.GET_API('purchases/companies/' + Company + '/supplier-families ', tt)
        .then(Response => {

            expect(Response.status).to.eq(200);
            cy.log(JSON.stringify(Response.body))
            id_suppliers_Family= ((Response.body["id"]))
       
        })

})


it('Get Export Supplier Family 200', () => {

    cy.GET_API('purchases/companies/' + Company + '/supplier-families/export', tt)
        .then(Response => {

            expect(Response.status).to.eq(200);
            cy.log(JSON.stringify(Response.body))
   
       
        })

})




it('Delete  Supplier Family 200', () => {

    cy.DELETE_API('purchases/companies/'+ Company + '/supplier-families/'+id_suppliers_Family, tt)
        .then(Response => {

            expect(Response.status).to.eq(200);
            cy.log(JSON.stringify(Response.body))
   
       
        })

})




})