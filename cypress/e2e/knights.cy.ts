describe('Lista de Cavaleiros (Cards)', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Deve criar um novo cavaleiro e exibi-lo como card', () => {
    cy.contains('button', 'Criar Cavaleiro').click()

    cy.get('input#name').type('Arthur')
    cy.get('input#nickname').type('King')
    cy.get('input#birthday').type('1985-12-25')
    cy.get('select#keyAttribute').select('strength')

    cy.get('input[id="weapon-name"]').type('Sword')
    cy.get('input[id="weapon-mod"]').type('3')
    cy.get('select#weapon-attr').select('strength')
    cy.get('input[type="checkbox"]').check()

    cy.contains('button', 'Salvar').click()

    cy.get('.modal').should('not.exist')

    cy.get('.cards-container .card')
      .last()
      .within(() => {
        cy.contains('h3', 'Arthur').should('be.visible')
        cy.contains('p', 'King').should('be.visible')
      })
  })

  it('Deve exibir a lista de cavaleiros como cards', () => {
    cy.get('.cards-container .card').should('have.length.at.least', 1)
  })

  it('Deve abrir o modal para criar um cavaleiro', () => {
    cy.contains('button', 'Criar Cavaleiro').click()

    cy.get('.modal').should('be.visible')
    cy.contains('h2', 'Criar Cavaleiro').should('be.visible')
  })

  it('Deve exibir os detalhes do cavaleiro ao clicar no card', () => {
    cy.get('.card-content').first().click()

    cy.get('.modal').should('be.visible')
    cy.contains('h2', 'Detalhes do Cavaleiro').should('be.visible')

    cy.get('.modal').within(() => {
      cy.contains('Nome:')
      cy.contains('Apelido:')
      cy.contains('Atributos:')
    })
  })

  it('Deve permitir tornar um cavaleiro um herói', () => {
    cy.get('.cards-container .card').find('button').contains('Tornar Herói').first().click()

    cy.get('.cards-container .card')
      .first()
      .find('button')
      .contains('Tornar Herói')
      .should('not.exist')
  })

  it('Deve permitir editar um cavaleiro ao clicar no botão Editar', () => {
    cy.get('.cards-container .card').first().find('button').contains('Editar').click()

    cy.get('.modal').should('be.visible')
    cy.contains('h2', 'Editar Cavaleiro').should('be.visible')

    cy.get('input#nickname').clear().type('NewNickname')
    cy.contains('button', 'Salvar').click()

    cy.get('.modal').should('not.exist')

    cy.get('.cards-container .card')
      .first()
      .find('.card-content')
      .should('contain.text', 'NewNickname')
  })
})
