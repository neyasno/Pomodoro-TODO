"use client";
import React, { Component } from "react";
import { ETimerStates, tick } from "@/store/slices/timeSlice";
import { connect } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";

interface TimerProps {
  time: string;
  timerState: ETimerStates;
  tick: () => void;
}

class Timer extends Component<TimerProps> {
  intervalId: NodeJS.Timeout | null = null;

  componentDidUpdate(prevProps: TimerProps) {
    if (this.props.timerState !== prevProps.timerState) {
      if (this.props.timerState === ETimerStates.WORKING || this.props.timerState === ETimerStates.RESTING) {
        this.startTimer();
      }
      else if (this.props.timerState === ETimerStates.STOP){
        this.stopTimer();
      }
    }
  }

  startTimer = () => {
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        this.props.tick();
      }, 1000);
    }
  };

  stopTimer = () => {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  };

  render() {
    const { time, timerState } = this.props;
    return (
      <div className="flex flex-col text-center">
        <h1 className="text-7xl">{time}</h1>
        {timerState === ETimerStates.WORKING && <p>Working</p>}
        {timerState === ETimerStates.RESTING && <p>Rest</p>}
        {timerState === ETimerStates.STOP && <p>Stop</p>}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  time: state.time.time,
  timerState: state.time.timerState,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  tick: () => dispatch(tick()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
