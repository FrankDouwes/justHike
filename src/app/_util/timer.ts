// simple class to add a pause option to setTimeout.

import Timeout = NodeJS.Timeout;

export class TimerObj {
  id:               Timeout;
  runTime:          number;         // the time in ms the timer should run for (in total)
  action:           Function;       // a callback function to execute once time runs out

  startTime?:       number;         // the start time (cleared on pause)
  timeRemaining?:   number;         // this is the time in ms that's remaining after a timer has been 'paused' (deleted)
}

// timeout in miliseconds, returns id, start-time
export function setTimeOut(runTime: number, action: Function): TimerObj {
  const _startTime: number = new Date().getTime();
  const _id: Timeout = setTimeout(function() {
    action();
  }, runTime);

  return {id: _id, startTime: _startTime, runTime: runTime, action: action};
}

// clearing the current timeout but setting the remaining time
export function pauseTimeOut(timerObj: TimerObj): TimerObj {

  const _currentTime = new Date().getTime();
  clearTimeout(timerObj.id);
  timerObj.timeRemaining = timerObj.runTime - (_currentTime - timerObj.startTime);
  timerObj.startTime = null;

  return timerObj;
}

// resumes the timeOut (creating a new timeout for the remaining time)
export function resumeTimeOut(timerObj: TimerObj): TimerObj {
  return setTimeOut(timerObj.timeRemaining, timerObj.action);
}

// clear timer
export function clearTimeOut(timerObj: TimerObj): void {

  if (timerObj) {

    if (timerObj.id) {
      clearTimeout(timerObj.id);
    }

    timerObj.action();
  }

  timerObj = null;
}
