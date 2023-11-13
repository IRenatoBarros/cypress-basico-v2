/// <reference types="Cypress" />






describe('Central de Atendimento ao Cliente TAT', function() {
    
    beforeEach(() => {
        cy.visit('./src/index.html')
      })



    it('Preenche os campos obrigatórios e envia o formulário', function(){
        cy.get('input[name="firstName"]').type('renato').should('have.value', 'renato')
        cy.get('input[name="lastName"]').type('barros').should('have.value','barros')
        cy.get('input[type="email"]').type('renato@gmail.com').should('have.value','renato@gmail.com')
        cy.get('#phone').type('2sdsd').should('not.have.value',String)
        cy.get('textarea').type('testando todos os botões obrigatórios com cypress hsfhjfjdfjdnfjsdsdsdsd',{delay:0}).should('be.visible')
        cy.get('button[type="submit"]').type('{enter}').should('be.visible')
        cy.get('[class="success"]').should('be.visible')


    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('input[name="firstName"]').type('renato').should('have.value', 'renato')
        cy.get('input[name="lastName"]').type('barros').should('have.value','barros')
        cy.get('input[type="email"]').type('renatogmail,com')
        cy.get('textarea').type('testando todos os botões obrigatórios com cypress hsfhjfjdfjdnfjsdsdsdsd',{delay:0}).should('be.visible')
        cy.get('button[type="submit"]').click
        cy.get('.error')
    
    })

    it('telefone com valor não numérico', function(){
        cy.get('#phone').type('sdsdsd').should('have.value','')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('input[name="firstName"]').type('renato').should('have.value', 'renato')
        cy.get('input[name="lastName"]').type('barros').should('have.value','barros')
        cy.get('input[type="email"]').type('renato@gmail.com').should('have.value','renato@gmail.com')
        cy.get('#phone-checkbox').check().should('be.checked')
        cy.get('textarea').type('testando todos os botões obrigatórios com cypress hsfhjfjdfjdnfjsdsdsdsd',{delay:0}).should('be.visible')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')


    })



    it('seleciona um produto (youtube) por seu texto', function(){
        cy.get('#product').select('YouTube').should('have.value','youtube')
    
    })

    it('Seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product').select('Mentoria').should('have.value','mentoria')
        cy.fillMandatoryFieldsAndSubmit()
    })

    it('Seleciona um produto (Blog) por seu valor (value)', function(){
        cy.get('#product').select('Blog').should('have.value','blog')
        cy.fillMandatoryFieldsAndSubmit()
    })

    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('[value="feedback"]').check().should('have.value','feedback')

    })



    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]').should('have.length',3).each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]').selectFile('./cypress/fixtures/example.json').should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop',function(){
        cy.get('input[type="file"]').should('not.have.value').selectFile('./cypress/fixtures/example.json', {action:'drag-drop'}).should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    // it('seleciona um arquivo utilizando ima fixture para a qual foi dada um alias', function(){
    //     cy.fixture('example.json').as('sampleFile')
    //     cy.get('input[type="file"]').should('not.have.value').selectFile('sampleFile').should(function($input){
    //         expect($input[0].files[0].name).to.equal('example.json')
    //     })
    // })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',function(){
        cy.get('#privacy a').should('have.attr','target','_blank')
    })

    it('acessa a página da política de privacidade abre em outra aba sem a necessidade de um clique',function(){
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
        cy.contains('Talking About Testing').should('be.visible')
    })

  })

  describe('Política de Privacidade',function(){
    it('testa a página da política de privacidade de forma independente',function(){
        cy.visit('./src/privacy.html')
        cy.get('[id="title"]').should('be.visible')
    })
  })