class Guess {

  constructor (guessObject) {
    this.player = guessObject.clientId;
    this.guess = guessObject.content.guess;
    this.status = "";

  }

}

module.exports = Guess;
