describe('toDo list site', () => {
  it('visit', () => {
    cy.visit('http://localhost:3000')
  })

  it('add a new item', () => {
    cy.get('#input-item').type('buy a laptop')
    cy.get('#complete-date').type('2012-11-20')
    cy.get('#button').click()
    cy.get('ul').contains('buy a laptop')
  })
   it('delete an item', () => {
    cy.get('#todos > li:nth-child(1) > button').click()
    cy.get('ul').should('not.have.text', 'Walk the dog')
   })
   it('refresh the page', () => {
    cy.reload()
    cy.get('ul').contains('Feed the computer')
    cy.get('ul').contains('buy a laptop')

   })
})
// A user visits the site(done), adds a new todo to the list(DONE), deletes a todo from the list (DONE), refreshes the page and the todos are still persisted/saved. something 