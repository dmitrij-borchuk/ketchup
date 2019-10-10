import React, { useContext } from 'react'
import Component from './timer.component'
import { AppStateContext } from '../../context'

export interface ITimerContainerProps {

}

export const TimerContainer: React.FC<ITimerContainerProps> = (props) => {
  const { state } = useContext(AppStateContext)
  const { timer: { seconds } } = state

  return <Component seconds={seconds} />
}
