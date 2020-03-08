const getDefaultSettingsMock = () => {
  return {
    playSound: true,
    sessions: [
      {
        name: 'test1',
        length: 1800, // 30 min
        id: 'id1',
      },
    ],
  }
}
const getSettingsMockWithTwoSessions = () => {
  return {
    playSound: true,
    sessions: [
      {
        name: 'test1',
        length: 1800, // 30 min
        id: 'id1',
      },
      {
        name: 'test2',
        length: 1500, // 25 min
        id: 'id2',
      },
    ],
  }
}

const page = {
  startBtn: () => cy.byTestId('start-btn'),
  pauseBtn: () => cy.byTestId('pause-btn'),
  finishBtn: () => cy.byTestId('finish-btn'),
  timer: () => cy.byTestId('timer'),
  sessionSelector: () => cy.byTestId('session-selector'),
  selectSession: (name) => {
    cy.byTestId('session-selector').click()
    cy.byTestId(`session-selector-item-${name}`).click()
  }
}

describe('Timer', function() {
  it('should show current timer on load', function() {
    cy.visit('/')
    cy.byTestId('timer').should('contain', '25:00')
  })

  it('shouldn\'t show default timer in case user save some custom timer', () => {
    localStorage.setItem('SETTINGS_KEY', JSON.stringify({
      playSound: true,
      sessions: [
        {
          name: 'test1',
          length: 1800, // 30 min
          id: 'id1',
        },
      ],
    }))

    cy.visit('/')
    cy.byTestId('timer').should('contain', '30:00')
  })

  it('should show new timer value when time is changed and it is stopped', () => {
    const settings = {
      playSound: true,
      sessions: [
        {
          name: 'test1',
          length: 1800, // 30 min
          id: 'id1',
        },
        {
          name: 'test2',
          length: 300, // 5 min
          id: 'id2',
        },
      ],
    }
    localStorage.setItem('SETTINGS_KEY', JSON.stringify(settings))

    cy.visit('/')
    cy.byTestId('timer').should('contain', '30:00')

    cy.byTestId('session-selector').click()
    cy.byTestId(`session-selector-item-${settings.sessions[1].name}`).click()
    cy.byTestId('timer').should('contain', '05:00')
  })

  it('should start timer after user clicks `start`', () => {
    cy.clock()

    const settings = {
      playSound: true,
      sessions: [
        {
          name: 'test1',
          length: 1800, // 30 min
          id: 'id1',
        },
      ],
    }
    localStorage.setItem('SETTINGS_KEY', JSON.stringify(settings))
    cy.visit('/')
    cy.byTestId('timer').should('contain', '30:00')
    cy.byTestId('start-btn').click()

    cy.tick(1000)
    cy.byTestId('timer').should('contain', '29:59')
    cy.tick(1000)
    cy.byTestId('timer').should('contain', '29:58')
    cy.tick(3000)
    cy.byTestId('timer').should('contain', '29:55')
  })

  it('should show pause btn instead of start btn', () => {
    const settings = getDefaultSettingsMock()
    localStorage.setItem('SETTINGS_KEY', JSON.stringify(settings))

    cy.visit('/')
    page.startBtn().should('exist');
    page.pauseBtn().should('not.exist');

    page.startBtn().click()
    page.startBtn().should('not.exist');
    page.pauseBtn().should('exist');
  })

  it('should pause timer after user clicks `pause`', () => {
    cy.clock()

    localStorage.setItem('SETTINGS_KEY', JSON.stringify(getDefaultSettingsMock()))
    cy.visit('/')
    page.timer().should('contain', '30:00')

    page.startBtn().click()
    cy.tick(1000)
    page.timer().should('contain', '29:59')

    page.pauseBtn().click()
    cy.tick(1000)
    page.timer().should('contain', '29:59')
  })

  it('should stop and reset timer after user clicks `finish`', () => {
    cy.clock()

    localStorage.setItem('SETTINGS_KEY', JSON.stringify(getDefaultSettingsMock()))
    cy.visit('/')
    page.timer().should('contain', '30:00')
    page.startBtn().click()
    cy.tick(1000)
    page.timer().should('contain', '29:59')

    page.finishBtn().click()
    cy.tick(1000)
    page.timer().should('contain', '30:00')
  })

  it('should stop and reset timer after timer reaches 0', () => {
    cy.clock()

    const settings = getDefaultSettingsMock()
    settings.sessions[0].length = 60 // 1 min
    settings.currentSession = settings.sessions[0]
    localStorage.setItem('SETTINGS_KEY', JSON.stringify(settings))
    cy.visit('/')
    page.timer().should('contain', '01:00')

    cy.tick(2000)
    page.timer().should('contain', '01:00')

    page.startBtn().click()
    cy.tick(2000)
    page.timer().should('contain', '00:58')

    cy.tick(60000)
    page.timer().should('contain', '00:00')

    cy.tick(10000)
    page.timer().should('contain', '00:00')
    page.startBtn().should('exist');
  })

  it('shouldn\'t show new timer value when time is changed and it is running', () => {
    cy.clock()

    const settings = getSettingsMockWithTwoSessions()
    localStorage.setItem('SETTINGS_KEY', JSON.stringify(settings))
    cy.visit('/')
    page.timer().should('contain', '30:00')

    page.startBtn().click()
    cy.tick(60000)
    page.timer().should('contain', '29:00')

    cy.byTestId('session-selector').click()
    cy.byTestId(`session-selector-item-${settings.sessions[1].name}`).click()
    page.timer().should('contain', '29:00')
  })

  it('should load last selected session', () => {
    const settings = getSettingsMockWithTwoSessions()
    localStorage.setItem('SETTINGS_KEY', JSON.stringify(settings))

    cy.visit('/')
    page.sessionSelector().should('contain', settings.sessions[0].name)

    page.selectSession(settings.sessions[1].name)
    page.sessionSelector().should('contain', settings.sessions[1].name)

    cy.reload()
    page.sessionSelector().should('contain', settings.sessions[1].name)
  })

  it('should continue timer after reload', () => {
    cy.clock()

    cy.visit('/')
    page.startBtn().click()
    cy.tick(2000)

    cy.visit('/').then(function() {
      this.clock.restore()
    })
    cy.clock(2000)
    page.timer().should('contain', '24:58')

    cy.tick(1000)
    page.timer().should('contain', '24:57')
  })

})
