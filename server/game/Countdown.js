class Countdown {

  constructor(seconds) {
    this.timeLeft = seconds;
    this.counting = false;
  }

  startCountdown() {
    if (this.counting) {
      console.log("Nope: already counting!")
      return null;
    }
    this.counting = true;

    setInterval


    startTimer(duration, display) {
      var timer = duration, minutes, seconds;
      setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
      }, 1000);
}


  }

}

module.exports = Countdown;