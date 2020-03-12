const page = {
  settingsBtn: () => cy.byTestId('settings-btn'),
  settingsAddSessionBtn: () => cy.byTestId('settings-add-session-btn'),
  sessionLengthInput: () => cy.byTestId('session-length-input').find('input'),
}

describe('Settings', function() {
  it('should limit session length to 99 min 59 sec', function() {
    cy.visit('/')
    page.settingsBtn().click()
    page.settingsAddSessionBtn().click()
    page.sessionLengthInput().type('9999')
    page.sessionLengthInput().should('have.value', '5999')
  })
})
