const { default: menuItem } = require("../supplier/menuItems");
const { default: supplier } = require("../supplier/createSupplier");
const { default: contact } = require("../supplier/createContact");
const { default: family } = require("../supplier/createFamily");


describe("testing automation", () => {
  context("Given that test seed generated", () => {
    before(() => {
      cy.fixture("web/credentials").as("credential");
      cy.fixture("web/supplierInfo").as("sup");
      cy.wrap('Fournisseur_'+Cypress._.random(0, 1e6)).as('name');      
    });

    context("And user logins successfully", () => {
      before(function () {
        cy.login(this.credential.credentialAdmin);
        cy.loginSuccessfully();
      });

      context("When validating Supplier functionalities", () => {
        it("should create a full supplier", function () {
          menuItem.goToAchat();
          menuItem.menuItem("fournisseur").click();
          supplier.createGenericSupplier("Liechtenstein", this.name, this.sup.properties);
          contact.fillContact();
          family.fillFamily(Cypress._.random(0, 1e6));
          cy.contains('Sauvegarder').click();
        });
      });
    });
  });
});
