const { beforeEach } = require('mocha');
const addContext = require('mochawesome/addContext');



let tt
let dt1
let id_suppliers_Family

let Company = Cypress.env("companyId")

describe('Suppliers Family', () => {
    before(() => {
        cy.fixture('SupplierFamily').then(dt => {
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
                cy.log(id_suppliers_Family)
           
            })

    })

    it('Get Supplier Family  200', () => {

        cy.GET_API('purchases/companies/' + Company + '/supplier-families/'+ id_suppliers_Family, tt)
            .then(Response => {
    
                expect(Response.status).to.eq(200);
                cy.log(JSON.stringify(Response.body))
       
           
            })
    
    })


it('Get List Supplier Family 200', () => {

    cy.GET_API('purchases/companies/' + Company + '/supplier-families ', tt)
        .then(Response => {

            expect(Response.status).to.eq(200);
            cy.log(JSON.stringify(Response.body))
      
       
        })

})


it('Get Export Supplier Family 200', () => {

    cy.GET_API('purchases/companies/' + Company + '/supplier-families/export?sort=name,asc&+companyId='+Company+'&exportFile%5Btype%5D=EXCEL&exportFile%5Bseparator%5D=COMMA', tt)
        .then(Response => {

            expect(Response.status).to.eq(200);
            cy.log(JSON.stringify(Response.body))
   
       
        })

})




it('Delete  Supplier Family 200', () => {

    https://purchase-qa.facilia.com/purchases/companies/2/supplier-families/124

   

    cy.DELETE_API('purchases/companies/'+ Company +'/supplier-families/'+id_suppliers_Family, tt)
        .then(Response => {
            cy.log(id_suppliers_Family)
            expect(Response.status).to.eq(204);
            cy.log(JSON.stringify(Response.body))
        
       
        })

})




})