describe("Signed up user, creates a business account", () => {
  it("login", () => {
    cy.session("bewag41727@fom8.com", () => {
      cy.visit("http://localhost:3000/login");
      cy.get(".c-cpTgHx-bBzSYw-type-default").type("bewag41727@fom8.com");
      cy.get(".c-cpTgHx-kowJZS-type-password").type("password123");
      cy.get("#auth-sign-in > div > button").click();
      cy.url().should("contain", "/businesshome");
    });
  });

  it("create new transaction", () => {
    cy.visit("http://localhost:3000/businesshome");

    cy.visit("http://localhost:3000/usersettings");
  });
});

export {};
