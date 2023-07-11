class LoginPage {

    elements = {
        email: () => cy.get("input[type='text']"),
        password: () => cy.get("input[type='password']"),
        submit: () => cy.get("button[type='submit']"),
        summary: () => cy.get(".p-toast-summary"),
        detail: () => cy.get(".p-toast-detail"),
        fieldError: () => cy.get(".p-error"),
        disconnect: () => cy.get("button[ptooltip='Déconnexion']")
    }

    login(credentials, menu){
        cy.login(credentials);
        cy.accessMenu(menu);
    }

    invalidPassword() {
        cy
            .fixture('credentials')
            .then(x => {
                this.elements.email().type(x.credential.email);
                this.elements.password().type(x.invalidPassword.password);
                this.elements.submit().click();
                this.elements.summary().should('contain', x.invalidPassword.summary);
                this.getDetailMessage().should('contain', x.invalidPassword.detail)
            })
    }

    invalidUser() {
        cy
            .fixture('credentials')
            .then(x => {
                this.elements.email().type(x.invalidUser.email);
                this.elements.password().type(x.credential.password);
                this.elements.submit().click();
                this.elements.fieldError().should('contain', x.invalidUser.emailMessage);         
            })
    }

    alertMessageShouldBe(expectedMessage) {
        this.elements.submit().click();
        cy.contains('.p-error', expectedMessage).should('be.visible')       
    }

    getDetailMessage(){
        return this.elements.detail();
    }
}

export default new LoginPage;