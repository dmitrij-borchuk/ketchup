import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  font-size: 5rem;
`;

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
    <Container>
      {minutesString}:{lastSecondsString}
    </Container>
  );
}

Timer.propTypes = {
  seconds: PropTypes.number,
};

Timer.defaultProps = {
  seconds: 0,
};
