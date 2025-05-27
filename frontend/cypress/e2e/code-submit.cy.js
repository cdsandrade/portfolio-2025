// const port = process.env.VITE_PORT || 4173

describe('CodeSubmit E2E', () => {
  it('submits form and shows response', () => {
    // cy.visit(`http://localhost:${port}`)
    cy.visit('/code-submit')
    cy.get('#input').type('2+2')
    cy.get('button[type="submit"]').click()
    // cy.contains('"result": 4')
    cy.get('pre').eq(0).should('contain.text', '"result": 4')
    cy.get('pre').eq(1).should('contain.text', '4')
  })
})
