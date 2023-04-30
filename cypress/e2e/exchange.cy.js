/// <reference types="Cypress"/>

describe("Exchange rate tests", () => {
  before(() => {
    cy.visit("index.html");
  });

  it("Verify that the main page items are showing", () => {
    cy.get("header").should("be.visible");
    cy.get(".home-section").should("be.visible");
    cy.get("footer").should("be.visible");

    cy.get(".overlay").should("not.be.visible");
  });

  it("Verify that the rate table appears correctly", () => {
    cy.get("#see-rates-btn").click();
    cy.get(".overlay").should("not.have.class", "occult");
    cy.get(".form-rates-section").should("have.class", "show-to-left");

    cy.get("#show").click();

    cy.get("#rates-table").should("not.have.class", "occult");
    cy.get(".form-rates").should("have.class", "occult");
  });

  it("Verify that the back button works correctly", () => {
    const backButton = cy.get(".back-menu-img");

    backButton.should("be.visible");
    backButton.click();
    cy.get("#rates-table").should("not.be.visible");
    backButton.should("not.be.visible");
  });

  it("Verify that the close menu button works correctly", () => {
    cy.get(".close-menu-img").then((closeBtn) => {
      closeBtn.click();
    });
    cy.get(".form-rates-section").should("not.have.class", "show-to-left");
    cy.get(".overlay").should("have.class", "occult");
  });

  it("Verify that the conversion form works correctly", () => {
    cy.get("#convert-btn").click();
    cy.get(".overlay").should("not.have.class", "occult");
    cy.get(".form-convert-section").should("have.class", "show-to-left");

    cy.get("#from-currency").type("aud");
    cy.get("#to-currency").type("ars");
    cy.get("#amount").type("10");

    cy.get("#convert").click();
    cy.get(".result-convert").should("have.class", "visible");
  });

  it("Verify that the close menu button works correctly", () => {
    cy.get(".close-menu-img").then((closeBtn) => {
      closeBtn.click();
    });
    cy.get(".form-rates-section").should("not.have.class", "show-to-left");
    cy.get(".overlay").should("have.class", "occult");
  });
});
