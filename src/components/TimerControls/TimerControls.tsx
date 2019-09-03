import React, { Fragment } from 'react'
// import cn from 'classnames'
// import css from './styles.css'
import Button from '../Button'

interface ITimerControlsProps {
  isStarted?: boolean,
  onStartClick?: EventListener,
  onPauseClick?: EventListener,
  onFinishClick?: EventListener,
}

export const TimerControls: React.FC<ITimerControlsProps> = (props) => {
  const {
    isStarted = false,
    onStartClick = () => {},
    onPauseClick = () => {},
    onFinishClick = () => {},
  } = props
  // const className = cn(css.button, css[type.toLowerCase()])

  // return (
  //   <button
  //     className={className}
  //     onClick={onClick}
  //   >
  //     {children}
  //   </button>
  // )
  return (
    <Fragment>
      {!isStarted
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
      {isStarted
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
// Button.TYPES = {
//   PRIMARY: 'PRIMARY',
// }

// TimerControls.propTypes = {
//   isStarted: PropTypes.bool,
//   onStartClick: PropTypes.func,
//   onPauseClick: PropTypes.func,
//   onFinishClick: PropTypes.func,
// }

// TimerControls.defaultProps = {
//   isStarted: false,
//   onStartClick: () => {},
//   onPauseClick: () => {},
//   onFinishClick: () => {},
//   // type: Button.TYPES.PRIMARY,
// }
