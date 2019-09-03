import React from 'react'

interface ITimerCounterProps {
  enabled: boolean
  onTick: Function
}
export class TimerCounter extends React.Component<ITimerCounterProps> {
  timer?: number

  updateTimer() {
    const { onTick, enabled } = this.props

    if (enabled) {
      this.startTimer()
    }
    onTick()
  }

  startTimer() {
    const msInSec = 1000
    clearTimeout(this.timer)
    this.timer = setTimeout(this.updateTimer.bind(this), msInSec)
  }

  componentDidUpdate(prevProps: ITimerCounterProps) {
    const { enabled } = this.props

    if (enabled !== prevProps.enabled) {
      if (enabled) {
        this.startTimer()
      } else {
        clearTimeout(this.timer)
      }
    }
  }

  componentDidMount() {
    const { enabled } = this.props
    if (enabled) {
      this.timer = setTimeout(this.updateTimer.bind(this), 1000)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  render() {
    return null
  }
}
