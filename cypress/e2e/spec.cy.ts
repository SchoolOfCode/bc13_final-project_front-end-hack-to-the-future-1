describe("Visit landing page working.", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000");
  });

  it("create new transaction", () => {
    // Extend test with Cypress Studio
  });

  /* ==== Test Created with Cypress Studio ==== */
  it("New user signs up, request sent to Supabase, a message is displayed", function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit("http://localhost:3000");
    cy.get(".border-2").click();
    cy.get('[href="#auth-sign-up"]').click();
    cy.get(":nth-child(1) > .supabase-ui-auth_ui-input").type(
      "bewag41727@fom8.com"
    );
    cy.get(":nth-child(2) > .supabase-ui-auth_ui-input").type("password123");
    cy.get(
      "#auth-sign-up > :nth-child(1) > .supabase-ui-auth_ui-button"
    ).click();
    cy.get("#auth-sign-up > span").should("be.visible");

    /* ==== End Cypress Studio ==== */
  });
});

export {};
