import React from 'react'
import { render, fireEvent, getByRole, waitForElement, act } from '@testing-library/react'
// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect'
import { AppContainer } from './components/App/app.container'
import { AppProviders } from './providers'
import { AppStateContextProvider, IAppState, StorageContext } from './context'
import { LOCAL_STORAGE_KEYS } from './constants'
import { getStorageContextValueMock } from './testHelpers/storageMock'

const getStateMock = (): IAppState => {
  return {
    settings: {
      sessions: [],
      playSound: false,
    },
    settingsPopupShown: false,
    timer: {
      seconds: 0,
      isStarted: false,
      isFinished: true,
    },
  }
}
const getStateWithSessionMock = (): IAppState => {
  const data = getStateMock()
  data.settings.sessions = [
    {
      name: 'test1',
      length: 1800, // 30 min
      id: 'id1',
    },
  ]
  return data
}

const testJsx = (
  storageContextValueMock: {
    setItem: () => void;
    getItem: <T>(key: string) => any;
  },
  data: IAppState,
) => (
  <AppProviders>
    <StorageContext.Provider value={storageContextValueMock}>
      <AppStateContextProvider value={data}>
        <AppContainer />
      </AppStateContextProvider>
    </StorageContext.Provider>
  </AppProviders>
)

const mockLocalStorageSettings = (data: IAppState) => {
  return getStorageContextValueMock((key: string) => {
    if (key === LOCAL_STORAGE_KEYS.SETTINGS) {
      return data.settings
    }
    return null
  })
}

describe('Application', () => {
  it('should show current timer on load', async () => {
    const { getByTestId } = render(
      <AppProviders>
        <AppContainer />
      </AppProviders>,
    )

    expect(getByTestId('timer')).toHaveTextContent('25:00')
  })

  it('shouldn\'t show default timer in case user save some custom timer', async () => {
    const data = getStateMock()
    data.settings.sessions = [
      {
        name: 'test1',
        length: 1800, // 30 min
        id: 'id1',
      },
    ]
    const storageContextValueMock = getStorageContextValueMock((key: string) => {
      if (key === LOCAL_STORAGE_KEYS.SETTINGS) {
        return data.settings
      }
      return null
    })
    const { getByTestId } = render(
      <AppProviders>
        <StorageContext.Provider value={storageContextValueMock}>
          <AppStateContextProvider value={data}>
            <AppContainer />
          </AppStateContextProvider>
        </StorageContext.Provider>
      </AppProviders>,
    )
    const timerEl = getByTestId('timer')
    expect(timerEl.innerHTML).toBe('30:00')
  })

  it('should show new timer value when time is changed and it is stopped', async () => {
    const data = getStateMock()
    data.settings.sessions = [
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
    ]
    const storageContextValueMock = getStorageContextValueMock((key: string) => {
      if (key === LOCAL_STORAGE_KEYS.SETTINGS) {
        return data.settings
      }
      return null
    })
    const { getByTestId, getByText } = render(
      <AppProviders>
        <StorageContext.Provider value={storageContextValueMock}>
          <AppStateContextProvider value={data}>
            <AppContainer />
          </AppStateContextProvider>
        </StorageContext.Provider>
      </AppProviders>,
    )
    const timerEl = getByTestId('timer')
    expect(timerEl.innerHTML).toBe('30:00')

    const sessionSelectorContainer = getByTestId('session-selector')
    const sessionSelectBtn = getByRole(
      sessionSelectorContainer,
      'button',
    )
    fireEvent.click(sessionSelectBtn)
    const sessionOption = getByText(data.settings.sessions[1].name)
    fireEvent.click(sessionOption)
    expect(timerEl.innerHTML).toBe('05:00')
  })

  it('should start timer after user clicks `start`', async () => {
    jest.useFakeTimers()

    const data = getStateWithSessionMock()
    const storageContextValueMock = getStorageContextValueMock((key: string) => {
      if (key === LOCAL_STORAGE_KEYS.SETTINGS) {
        return data.settings
      }
      return null
    })
    const { getByTestId } = render(testJsx(storageContextValueMock, data))
    const timerEl = getByTestId('timer')
    const startBtnContainer = getByTestId('start-btn')
    const startBtn = startBtnContainer.children[0]
    expect(timerEl.innerHTML).toBe('30:00')
    act(() => {
      fireEvent.click(startBtn)
    })

    act(() => {
      jest.advanceTimersByTime(1000)
    })
    expect(timerEl.innerHTML).toBe('29:59')
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    expect(timerEl.innerHTML).toBe('29:58')
    act(() => {
      jest.advanceTimersByTime(3000)
    })
    expect(timerEl.innerHTML).toBe('29:55')
  })

  it('should show pause btn instead of start btn', async () => {
    const data = getStateWithSessionMock()
    const storageContextValueMock = getStorageContextValueMock((key: string) => {
      if (key === LOCAL_STORAGE_KEYS.SETTINGS) {
        return data.settings
      }
      return null
    })
    const { queryByTestId } = render(testJsx(storageContextValueMock, data))
    let startBtnContainer = queryByTestId('start-btn')
    let pauseBtnContainer = queryByTestId('pause-btn')
    expect(startBtnContainer).not.toBe(null)
    expect(pauseBtnContainer).toBe(null)

    if (startBtnContainer) {
      const startBtn = startBtnContainer.children[0]
      act(() => {
        fireEvent.click(startBtn)
      })

      startBtnContainer = queryByTestId('start-btn')
      pauseBtnContainer = queryByTestId('pause-btn')

      expect(startBtnContainer).toBe(null)
      expect(pauseBtnContainer).not.toBe(null)
    }
  })

  it('should pause timer after user clicks `pause`', async () => {
    jest.useFakeTimers()

    const data = getStateWithSessionMock()
    const storageContextValueMock = getStorageContextValueMock((key: string) => {
      if (key === LOCAL_STORAGE_KEYS.SETTINGS) {
        return data.settings
      }
      return null
    })
    const { getByTestId } = render(testJsx(storageContextValueMock, data))
    const timerEl = getByTestId('timer')
    const startBtnContainer = getByTestId('start-btn')
    const startBtn = startBtnContainer.children[0]
    expect(timerEl.innerHTML).toBe('30:00')
    act(() => {
      fireEvent.click(startBtn)
    })
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    expect(timerEl.innerHTML).toBe('29:59')

    const pauseBtnContainer = getByTestId('pause-btn')
    const pauseBtn = pauseBtnContainer.children[0]
    act(() => {
      fireEvent.click(pauseBtn)
    })
    act(() => {
      jest.advanceTimersByTime(5000)
    })
    expect(timerEl.innerHTML).toBe('29:59')
  })

  it('should stop and reset timer after user clicks `finish`', async () => {
    jest.useFakeTimers()

    const data = getStateWithSessionMock()
    data.settings.sessions[0].length = 1800 // 30 min
    data.currentSession = data.settings.sessions[0]
    const storageContextValueMock = mockLocalStorageSettings(data)
    const { getByTestId } = render(testJsx(storageContextValueMock, data))
    const timerEl = getByTestId('timer')
    const startBtnContainer = getByTestId('start-btn')
    const startBtn = startBtnContainer.children[0]
    expect(timerEl.innerHTML).toBe('30:00')
    act(() => {
      fireEvent.click(startBtn)
    })
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    expect(timerEl.innerHTML).toBe('29:59')

    const finishBtnContainer = getByTestId('finish-btn')
    const finishBtn = finishBtnContainer.children[0]
    act(() => {
      fireEvent.click(finishBtn)
    })
    act(() => {
      jest.advanceTimersByTime(5000)
    })
    expect(timerEl.innerHTML).toBe('30:00')
  })

  it('should stop and reset timer after timer reaches 0', async () => {
    jest.useFakeTimers()

    const data = getStateWithSessionMock()
    data.settings.sessions[0].length = 60 // 1 min
    data.currentSession = data.settings.sessions[0]
    const storageContextValueMock = mockLocalStorageSettings(data)
    const { getByTestId } = render(testJsx(storageContextValueMock, data))
    const timerEl = getByTestId('timer')
    const startBtnContainer = getByTestId('start-btn')
    const startBtn = startBtnContainer.children[0]
    expect(timerEl.innerHTML).toBe('01:00')
    act(() => {
      jest.advanceTimersByTime(2000)
    })
    expect(timerEl.innerHTML).toBe('01:00')
    act(() => {
      fireEvent.click(startBtn)
    })
    act(() => {
      jest.advanceTimersByTime(2000)
    })
    expect(timerEl.innerHTML).toBe('00:58')
    act(() => {
      jest.advanceTimersByTime(60000)
    })
    expect(timerEl.innerHTML).toBe('00:00')
    act(() => {
      jest.advanceTimersByTime(10000)
    })
    expect(timerEl.innerHTML).toBe('00:00')
    expect(startBtn).toBeVisible()
  })

  it('shouldn\'t show new timer value when time is changed and it is running', async () => {
    jest.useFakeTimers()
    const data = getStateMock()
    data.settings.sessions = [
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
    ]
    const storageContextValueMock = getStorageContextValueMock((key: string) => {
      if (key === LOCAL_STORAGE_KEYS.SETTINGS) {
        return data.settings
      }
      return null
    })
    const { getByTestId, getByText } = render(
      <AppProviders>
        <StorageContext.Provider value={storageContextValueMock}>
          <AppStateContextProvider value={data}>
            <AppContainer />
          </AppStateContextProvider>
        </StorageContext.Provider>
      </AppProviders>,
    )
    const timerEl = getByTestId('timer')
    expect(timerEl.innerHTML).toBe('30:00')
    const startBtnContainer = getByTestId('start-btn')
    const startBtn = startBtnContainer.children[0]
    act(() => {
      fireEvent.click(startBtn)
    })
    act(() => {
      jest.advanceTimersByTime(60000)
    })
    expect(timerEl.innerHTML).toBe('29:00')

    const sessionSelectorContainer = getByTestId('session-selector')
    const sessionSelectBtn = getByRole(
      sessionSelectorContainer,
      'button',
    )
    fireEvent.click(sessionSelectBtn)
    const sessionOption = getByText(data.settings.sessions[1].name)
    fireEvent.click(sessionOption)
    expect(timerEl.innerHTML).toBe('29:00')
  })

  it('should play the sound', async () => {
    throw new Error('Not implemented')
  })
  it('shouldn\'t play the sound', async () => {
    throw new Error('Not implemented')
  })
  it('should load last selected session', async () => {
    throw new Error('Not implemented')
  })
})
