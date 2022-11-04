describe('toDo list site', () => {
  it('visit', () => {
    cy.visit('http://localhost:3000')
  })

  it('add a new item', () => {
    cy.get('#input-item').type('buy a laptop')
    cy.get('#complete-date').type('2012-11-20')
    cy.get('#button').click()
  })

})
// A user visits the site(done), adds a new todo to the list, deletes a todo from the list, refreshes the page and the todos are still persisted/saved. something 
