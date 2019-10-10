import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  font-size: 5rem;
`

const secondsInMinute = 60

interface ITimerProps {
  seconds?: number
}
const Timer: React.FC<ITimerProps> = (props) => {
  const {
    seconds = 0,
  } = props
  const minutes = Math.floor(seconds / secondsInMinute)
  const lastSeconds = seconds - (minutes * secondsInMinute)
  const minutesString = minutes.toString().padStart(2, '0')
  const lastSecondsString = lastSeconds.toString().padStart(2, '0')

  return (
    <Container data-testid="timer">
      {minutesString}
      :
      {lastSecondsString}
    </Container>
  )
}

export default Timer
