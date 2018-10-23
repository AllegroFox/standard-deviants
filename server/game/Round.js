class Round {

  constructor (gameModule) {
    this.guesses = [];
    this.answerBank = [{id: "victory", status: "unguessed"}, {id: "spoon", status: "unguessed"}];
    this.objective = "";
    // this.rules = gameModule.rules;
    // this.generateAnswerBank = gameModule.generateAnswerBank;
  }

  checkGuess (guessObject) {
    let result = false;
    this.answerBank.forEach((answer) => {
      if (guessObject.content.guess.toLowerCase() === answer.id) {
        console.log(`${guessObject.clientId} got it!!!`);
        result = true;
      }
    })

    return result;
    }

}

module.exports = Round;
