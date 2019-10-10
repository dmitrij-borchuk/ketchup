import React, { Fragment } from 'react'
// import cn from 'classnames'
// import css from './styles.css'
import Button from '../Button'

interface ITimerControlsProps {
  isRunning?: boolean,
  onStartClick?: EventListener,
  onPauseClick?: EventListener,
  onFinishClick?: EventListener,
}

export const TimerControls: React.FC<ITimerControlsProps> = (props) => {
  const {
    isRunning = false,
    onStartClick = () => {},
    onPauseClick = () => {},
    onFinishClick = () => {},
  } = props

  return (
    <Fragment>
      {!isRunning
        && (
          <span data-testid="start-btn">
            <Button
              onClick={onStartClick}
              large
            >
              Start
            </Button>
          </span>
        )
      }
      {isRunning
        && (
          <span data-testid="pause-btn">
            <Button
              onClick={onPauseClick}
              large
            >
              Pause
            </Button>
          </span>
        )
      }
      <span data-testid="finish-btn">
        <Button
          onClick={onFinishClick}
          large
        >
          Finish
        </Button>
      </span>
    </Fragment>
  )
}
