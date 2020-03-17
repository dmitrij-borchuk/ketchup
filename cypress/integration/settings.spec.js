const page = {
  settingsBtn: () => cy.byTestId('settings-btn'),
  settingsAddSessionBtn: () => cy.byTestId('settings-add-session-btn'),
  sessionNameInput: () => cy.byTestId('session-name-input').find('input'),
  sessionLengthInput: () => cy.byTestId('session-length-input').find('input'),
  sessionSaveBtn: () => cy.byTestId('session-edit-save-btn'),
  settingsSaveBtn: () => cy.byTestId('settings-save-btn'),
  addSession: (name, length) => {
    page.settingsAddSessionBtn().click()
    page.sessionNameInput().type(name)
    page.sessionLengthInput().type(length)
    page.sessionSaveBtn().click()
  },
  findSessionEditBtn: (name) => cy.byTestId(`session-${name}`).find('[data-testid=session-edit-btn]'),
}

describe('Settings', function() {
  it('should limit session length to 99 min 59 sec', function() {
    cy.visit('/')
    page.settingsBtn().click()
    page.settingsAddSessionBtn().click()
    page.sessionLengthInput().type('9999')
    page.sessionLengthInput().should('have.value', '5999')
  })

  it.only('edit session modal should be prefilled with correct data', function() {
    const sessionName = 'test'
    const sessionLength = 50

    cy.visit('/')
    page.settingsBtn().click()
    page.addSession(sessionName, 50)
    page.settingsSaveBtn().click()

    cy.reload()
    page.settingsBtn().click()
    page.findSessionEditBtn(sessionName).click()
    page.sessionNameInput().should('have.value', sessionName)
    page.sessionLengthInput().should('have.value', sessionLength.toString())

  })
})
