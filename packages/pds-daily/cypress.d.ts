declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM elsement by data-test attribute.
     * @example cy.getBySel('greeting')
     */
    getBySel(selector: string): Chainable<JQuery<HTMLElement>>
  }
}
