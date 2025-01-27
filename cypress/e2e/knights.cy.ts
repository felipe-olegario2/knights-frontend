describe('Lista de Cavaleiros (Cards)', () => {
  beforeEach(() => {
    // Visita a página inicial antes de cada teste
    cy.visit('/')
  })

  it('Deve criar um novo cavaleiro e exibi-lo como card', () => {
    // Abre o modal de criação
    cy.contains('button', 'Criar Cavaleiro').click()

    // Preenche o formulário
    cy.get('input#name').type('Arthur')
    cy.get('input#nickname').type('King')
    cy.get('input#birthday').type('1985-12-25')
    cy.get('select#keyAttribute').select('strength')

    cy.get('input[id="weapon-name"]').type('Sword')
    cy.get('input[id="weapon-mod"]').type('3')
    cy.get('select#weapon-attr').select('strength')
    cy.get('input[type="checkbox"]').check()

    // Submete o formulário
    cy.contains('button', 'Salvar').click()

    // Verifica se o modal fechou
    cy.get('.modal').should('not.exist')

    // Verifica se o novo cavaleiro foi adicionado como um card
    cy.get('.cards-container .card')
      .last()
      .within(() => {
        cy.contains('h3', 'Arthur').should('be.visible')
        cy.contains('p', 'King').should('be.visible')
      })
  })

  it('Deve exibir a lista de cavaleiros como cards', () => {
    // Verifica se os cards estão visíveis
    cy.get('.cards-container .card').should('have.length.at.least', 1)
  })

  it('Deve abrir o modal para criar um cavaleiro', () => {
    // Clica no botão para abrir o modal
    cy.contains('button', 'Criar Cavaleiro').click()

    // Verifica se o modal foi aberto
    cy.get('.modal').should('be.visible')
    cy.contains('h2', 'Criar Cavaleiro').should('be.visible')
  })

  it('Deve exibir os detalhes do cavaleiro ao clicar no card', () => {
    // Clica no primeiro card da lista
    cy.get('.card-content').first().click()

    // Verifica se o modal foi aberto
    cy.get('.modal').should('be.visible')
    cy.contains('h2', 'Detalhes do Cavaleiro').should('be.visible')

    // Verifica os detalhes do cavaleiro
    cy.get('.modal').within(() => {
      cy.contains('Nome:')
      cy.contains('Apelido:')
      cy.contains('Atributos:')
    })
  })

  it('Deve permitir tornar um cavaleiro um herói', () => {
    // Encontra o primeiro card com botão "Tornar Herói"
    cy.get('.cards-container .card').find('button').contains('Tornar Herói').first().click()

    // Verifica se o botão foi removido
    cy.get('.cards-container .card')
      .first()
      .find('button')
      .contains('Tornar Herói')
      .should('not.exist')
  })

  it('Deve permitir editar um cavaleiro ao clicar no botão Editar', () => {
    // Encontra o botão "Editar" no primeiro card
    cy.get('.cards-container .card').first().find('button').contains('Editar').click()

    // Verifica se o modal foi aberto
    cy.get('.modal').should('be.visible')
    cy.contains('h2', 'Editar Cavaleiro').should('be.visible')

    // Altera o apelido
    cy.get('input#nickname').clear().type('NewNickname')
    cy.contains('button', 'Salvar').click()

    // Verifica se o modal fechou
    cy.get('.modal').should('not.exist')

    // Verifica se o apelido foi atualizado no card
    cy.get('.cards-container .card')
      .first()
      .find('.card-content')
      .should('contain.text', 'NewNickname')
  })
})
