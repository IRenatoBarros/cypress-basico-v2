Cypress.Commands.add('fillMandatoryFieldsAndSubmit',function(){
    cy.get('input[name="firstName"]').type('renato').should('have.value', 'renato')
        cy.get('input[name="lastName"]').type('barros').should('have.value','barros')
        cy.get('input[type="email"]').type('renatos@gmail.com').should('have.value','renatos@gmail.com')
        cy.get('#phone').type('2sdsd').should('not.have.value',String)
        cy.get('textarea').type('testando todos os botões obrigatórios com cypress hsfhjfjdfjdnfjsdsdsdsd',{delay:0}).should('be.visible')
        cy.get('button[type="submit"]').type('{enter}').should('be.visible')
        cy.get('[class="success"]').should('be.visible')

})