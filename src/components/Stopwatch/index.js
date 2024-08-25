// Write your code here
import {Component} from 'react'
import './index.css'

class Stopwatch extends Component {
  state = {isTimerRunning: false, timerInSeconds: 0}

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  increaseTime = () => {
    this.setState(prevState => ({
      timerInSeconds: prevState.timerInSeconds + 1,
    }))
  }

  onStartTimer = () => {
    this.intervalId = setInterval(this.increaseTime, 1000)
    this.setState({isTimerRunning: true})
  }

  onStopTimer = () => {
    const {isTimerRunning} = this.state

    if (isTimerRunning) {
      clearInterval(this.intervalId)
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timerInSeconds: prevState.timerInSeconds + 1,
      }))
    }
  }

  onResetTimer = () => {
    this.setState({isTimerRunning: false, timerInSeconds: 0})
    clearInterval(this.intervalId)
  }

  renderSeconds = () => {
    const {timerInSeconds} = this.state
    const seconds = Math.floor(timerInSeconds % 60)
    console.log(`seconds: 0${seconds}`)
    if (seconds < 10) {
      return `0${seconds}`
    }
    return seconds
  }

  renderMinutes = () => {
    const {timerInSeconds} = this.state
    const minutes = Math.floor(timerInSeconds / 60)
    console.log(`minutes:0${minutes}`)
    if (minutes < 10) {
      return `0${minutes}`
    }
    return minutes
  }

  render() {
    const {isTimerRunning} = this.state
    const time = `${this.renderMinutes()}:${this.renderSeconds()}`

    return (
      <div className="app-container">
        <div className="stopwatch-container">
          <h1 className="heading">Stopwatch</h1>
          <div className="timer-container">
            <div className="timer-logo-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
                alt="stopwatch"
                className="timer-img"
              />
              <h1 className="timer-heading">Timer</h1>
            </div>
            <h1 className="stopwatch-heading">{time}</h1>
            <div className="timer-button-container">
              <button
                type="button"
                className="btn btn-success"
                onClick={this.onStartTimer}
                disabled={isTimerRunning}
              >
                Start
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.onStopTimer}
              >
                Stop
              </button>
              <button
                type="button"
                className="btn btn-warning"
                onClick={this.onResetTimer}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Stopwatch
