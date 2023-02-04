import DayOrganizer from './DayOrganizer.vue'

describe('<DayOrganizer />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(DayOrganizer)
  })
})
