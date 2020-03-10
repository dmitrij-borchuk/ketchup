import { RenderResult, getByRole } from '@testing-library/react'

export const getPageMethods = (renderResult: RenderResult) => {
  const { getByTestId } = renderResult
  return {
    getStartBtn(): Element {
      const startBtnContainer = getByTestId('start-btn')
      return startBtnContainer.children[0]
    },
    getSessionsSelect(): HTMLElement {
      const sessionSelectorContainer = getByTestId('session-selector')
      return getByRole(
        sessionSelectorContainer,
        'button',
      )
    },
    getTimerElement(): Element {
      return getByTestId('timer')
    },
  }
}
