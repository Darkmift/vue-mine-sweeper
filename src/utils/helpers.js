export function renderTimer(timeObj) {
  console.log("🚀 ~ file: helpers.js ~ line 2 ~ renderTimer ~ timeObj",
    timeObj, timeObj.gameRunning)
  timeObj.intervalAnchor = setInterval(() => {

    if (!timeObj.gameRunning) {
      clearInterval(timeObj.intervalAnchor)
      timeObj.intervalAnchor = null;
      // timeObj.timer = 0
    } else {
      timeObj.timer++
    }

    let timerToString = timeObj.timer.toString()
    switch (timerToString.length) {
      case 1:
        timerToString = '00' + timerToString
        break;
      case 2:
        timerToString = '0' + timerToString
        break;
    }

    timeObj.timerToString = timerToString
    console.log("🚀 ~ file: helpers.js ~ line 2 ~ renderTimer ~ timeObj", timeObj)
  }, 1000)
}