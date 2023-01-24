  describe('Signed up user, creates a business account', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
  })

  it('create new transaction', () => {
    cy.visit('http://localhost:3000');
    cy.get('.border-2').click();
    cy.wait(2000)
    cy.get('.c-cpTgHx-bBzSYw-type-default').type('bewag41727@fom8.com');
    cy.get('.c-cpTgHx-kowJZS-type-password').type('password123');
    cy.get('#auth-sign-in > div > button').click();
    cy.wait(2000)
    cy.visit('http://localhost:3000/usertype')
    cy.get('[data-cy="name-field"]').type('Steven Cypress');
    cy.wait(2000)
    cy.get('[data-cy="CONTINUE AS BUSINESS"]').click();
    cy.getCookies().then((cookies) => {
      Cypress.Cookies.preserveOnce(...cookies.map((c) => c.name));
  });
  })

  it('passes', () => {
    cy.visit('http://localhost:3000/usersettings')
  })

});
