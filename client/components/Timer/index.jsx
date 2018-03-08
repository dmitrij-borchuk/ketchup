import React from 'react';
import PropTypes from 'prop-types';
import css from './styles.css';

const secondsInMinute = 60;
export default function Timer(props) {
  const {
    seconds,
  } = props;
  const minutes = Math.floor(seconds / secondsInMinute);
  const lastSeconds = seconds - (minutes * secondsInMinute);
  const minutesString = minutes.toString().padStart(2, '0');
  const lastSecondsString = lastSeconds.toString().padStart(2, '0');

  return (
    <div className={css.timer}>
      {minutesString}:{lastSecondsString}
    </div>
  );
}

Timer.propTypes = {
  seconds: PropTypes.number,
};

Timer.defaultProps = {
  seconds: 0,
};
