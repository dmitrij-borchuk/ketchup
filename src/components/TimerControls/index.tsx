import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// import cn from 'classnames';
// import css from './styles.css';
import Button from '../Button';

export default function TimerControls(props: any) {
  const {
    isStarted,
    onStartClick,
    onPauseClick,
    onFinishClick,
  } = props;
  // const className = cn(css.button, css[type.toLowerCase()]);

  // return (
  //   <button
  //     className={className}
  //     onClick={onClick}
  //   >
  //     {children}
  //   </button>
  // );
  return (
    <Fragment>
      {!isStarted
        && (
          <Button
            onClick={onStartClick}
            large
          >
            Start
          </Button>
        )
      }
      {isStarted
        && (
          <Button
            onClick={onPauseClick}
            large
          >
            Pause
          </Button>
        )
      }
      <Button
        onClick={onFinishClick}
        large
      >
        Finish
      </Button>
    </Fragment>
  );
}
// Button.TYPES = {
//   PRIMARY: 'PRIMARY',
// };

TimerControls.propTypes = {
  isStarted: PropTypes.bool,
  onStartClick: PropTypes.func,
  onPauseClick: PropTypes.func,
  onFinishClick: PropTypes.func,
};

TimerControls.defaultProps = {
  isStarted: false,
  onStartClick: () => {},
  onPauseClick: () => {},
  onFinishClick: () => {},
  // type: Button.TYPES.PRIMARY,
};
