import React, { useContext, useCallback } from 'react'
import { TimerControls } from './TimerControls'
import { AppStateContext, ACTIONS } from '../../context'
import { playSound } from '../../utils/soundManager'
import { TimerCounter } from '../TimerCounter'
import alarmSound from '../../assets/sounds/Twin-bell-alarm-clock-ringing-short.mp3'

export const TimerControlsContainer: React.FC = () => {
  const { state, dispatch } = useContext(AppStateContext)
  const { timer, settings: { playSound: isPlaySound } } = state
  const { isRunning, seconds } = timer
  const onTick = useCallback(
    () => {
      const newSeconds = seconds - 1

      if (newSeconds <= 0) {
        dispatch({ type: ACTIONS.STOP_TIMER })
        if (isPlaySound) {
          playSound(alarmSound)
        }
      }
      dispatch({ type: ACTIONS.DECREASE_TIMER })
    },
    [seconds, isPlaySound, dispatch],
  )
  const onStartClick = useCallback(
    () => {
      if (seconds === 0) {
        dispatch({ type: ACTIONS.RESET_TIMER })
      }
      dispatch({ type: ACTIONS.START_TIMER })
    },
    [dispatch, seconds],
  )
  const onPauseClick = useCallback(() => dispatch({ type: ACTIONS.STOP_TIMER }), [dispatch])
  const onFinishClick = useCallback(() => dispatch({ type: ACTIONS.RESET_TIMER }), [dispatch])

  return (
    <>
      <TimerControls
        isRunning={isRunning}
        onStartClick={onStartClick}
        onPauseClick={onPauseClick}
        onFinishClick={onFinishClick}
      />
      <TimerCounter
        enabled={isRunning}
        onTick={onTick}
      />
    </>
  )
}
