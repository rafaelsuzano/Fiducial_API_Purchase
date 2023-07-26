const { default: menuItem } = require("../supplier/menuItems");
const { default: supplier } = require("../supplier/createSupplier");
const { default: contact } = require("../supplier/createContact");
const { default: family } = require("../supplier/createFamily");
const { default: payment } = require("../supplier/paymentMode");


describe("testing automation", () => {
  context("Given that test seed generated", () => {
    before(() => {
      cy.fixture("web/credentials").as("credential");
      cy.fixture("web/supplierInfo").as("sup");
      let serial = Cypress._.random(0, 1e6);
      cy.wrap('Fournisseur'+`_${serial}`).as('name');
      cy.wrap('Family'+`_${serial}`).as('family');

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
          family.fillFamily(this.family);
          cy.get('fiducial-purchases-supplier-creator').should('be.visible')
          payment.fillPaymentMode(this.sup.properties.paymentMode);
          cy.contains('Sauvegarder').click({force: false});
        });
      });
    });
  });
});
