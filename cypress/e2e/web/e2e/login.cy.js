const { default: menuItem } = require("../supplier/menuItems");
const { default: supplier } = require("../supplier/createSupplier");

describe("testing automation", () => {
  context("Given that test seed generated", () => {
    before(() => {
      cy.fixture("web/credentials").as("credential");
      cy.fixture("web/supplierInfo").as("sup");
    });

    context("And user logins successfully", () => {
      before(function () {
        cy.login(this.credential.credentialAdmin);
      });

      context("when Articles form fields are validated", () => {
        it("should be required", function () {
          menuItem.openServices();
          menuItem.menuItem("fournisseur").click();
          supplier.createGenericSupplier("Liechtenstein", this.sup.properties);
          cy.contains('Sauvegarder').click();
        });
      });
    });
  });
});
