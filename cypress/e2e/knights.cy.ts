describe('Lista de Cavaleiros', () => {
    beforeEach(() => {
        // Visita a página inicial antes de cada teste
        cy.visit('/');
    });

    it('Deve exibir o título "Lista de Cavaleiros"', () => {
        cy.contains('h1', 'Lista de Cavaleiros').should('be.visible');
    });

    it('Deve carregar a lista de cavaleiros', () => {
        // Checa se os cavaleiros foram carregados da API real
        cy.get('table tbody tr').should('have.length.at.least', 1);
    });

    it('Deve abrir o modal para criar um cavaleiro', () => {
        // Clica no botão para abrir o modal
        cy.contains('button', 'Criar Cavaleiro').click();

        // Verifica se o modal abriu
        cy.get('.modal').should('be.visible');
        cy.contains('h2', 'Criar Cavaleiro').should('be.visible');
    });

    it('Deve aplicar o filtro de "Apenas Heróis"', () => {
        // Seleciona o filtro "Apenas Heróis"
        cy.get('select#filter').select('heroes');

        // Verifica se a tabela exibe apenas heróis
        cy.get('table tbody tr').should('have.length.at.least', 1);
    });
});

describe('Modal de Criação de Cavaleiros', () => {
    beforeEach(() => {
        cy.visit('/'); // Visita a página inicial
    });

    it('Deve abrir o modal para criar um cavaleiro', () => {
        // Aguarda o título da página
        cy.contains('h1', 'Lista de Cavaleiros').should('be.visible');

        // Aguarda o botão e clica nele
        cy.contains('button', 'Criar Cavaleiro', { timeout: 10000 }).should('be.visible').click();

        // Verifica se o modal foi aberto
        cy.get('.modal').should('be.visible');
        cy.contains('h2', 'Criar Cavaleiro').should('be.visible');
    });

    it('Deve preencher o formulário e criar um novo cavaleiro', () => {
        // Abre o modal
        cy.contains('button', 'Criar Cavaleiro').click();

        // Preenche o formulário
        cy.get('input#name').type('Arthur');
        cy.get('input#nickname').type('King');
        cy.get('input#birthday').type('1985-12-25');
        cy.get('select#keyAttribute').select('strength');

        // Adiciona uma arma
        cy.get('input[id="weapon-name"]').type('Sword');
        cy.get('input[id="weapon-mod"]').type('3');
        cy.get('select#weapon-attr').select('strength');
        cy.get('input[type="checkbox"]').check();

        // Submete o formulário
        cy.contains('button', 'Salvar').click();

        // Verifica se o modal fechou
        cy.get('.modal').should('not.exist');

        // Verifica se a lista foi atualizada com o novo cavaleiro
        cy.get('table tbody tr').should('contain.text', 'Arthur');
    });
});
