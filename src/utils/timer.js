const DEFAULT_TIMER = 30;

export const useTimer = (seconds = DEFAULT_TIMER) => {
  let timerId;
  let timerActionId;
  let time = 0;

  const eventListeners = [];

  const notifyListeners = (newTime) => {
    eventListeners.forEach(listener => listener(newTime));
  }

  const startTimer = (params = {}) => {
    if (timerId) return;

    time = params.startTime ?? seconds;

    timerId = setInterval(timerChangeHandler, 1000);

    if (params.callback) {
      timerActionId = setTimeout(() => {
        if (params.callback) {
          params.callback();
        }

        stopTimer();
      }, seconds * 1000);
    }
  }

  const timerChangeHandler = () => {
    if (time <= 0) {
      stopTimer();

      return;
    }

    time--;
    notifyListeners(time);
  }

  const stopTimer = () => {
    time = 0;

    clearInterval(timerId);
    clearTimeout(timerActionId);

    timerId = undefined;
    timerActionId = undefined;

    notifyListeners(time);
  }

  const subscribe = (listener) => {
    eventListeners.push(listener);
  }

  const unsubscribe = (listener) => {
    const index = eventListeners.indexOf(listener);

    if (index !== -1) {
      eventListeners.splice(index, 1);
    }
  }

  return {
    time,
    startTimer,
    stopTimer,
    subscribe,
    unsubscribe,
  };
}
