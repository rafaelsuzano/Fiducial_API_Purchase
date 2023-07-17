describe('testing automation', () => {
    context('Given that test data is loaded', () => {
        before(() => {
            cy.fixture('credentials').as('credential')
        })

        context('And user logins successfully', () => {
            before(function () {
                cy.login(this.credential.credentialAdmin);
            })

            context('when Articles form fields are validated', () => {
                const messages = [
                    { field: 'Désignation longue', output: 'Ce champ est requis !' },
                    { field: 'Type', output: 'Ce champ est requis !' },
                    { field: "Code d'article", output: 'Ce champ est requis !' },
                ]

                messages.forEach(function (msg) {
                    it(`Then ${msg.field} should be required`, function () {
                        console.log(msg.output)
                    })
                })
               
            });
        });
    });
});