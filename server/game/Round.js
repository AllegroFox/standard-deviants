const Guess = require('./Guess.js');
const Answer = require('./Answer.js');
const buildPool = require ('./gameModules/bank-gen-synonyms.js');

class Round {

  constructor (gameModule) {
    this.guesses = [];
    this.answerBank = [{id: "victory", status: "unguessed"}, {id: "spoon", status: "unguessed"}];
    this.objective = "";
  }

  checkGuess (guessObject) {
    const newGuess = new Guess(guessObject);
    const result = this.answerBank.find(answer => newGuess.guess.toLowerCase() === answer.id)

    if (result) {
      if (result.status === "unguessed") {
        result.status = "unique";
        newGuess.status = "unique";
      } else if (result.status === "unique") {
        result.status = "popular";
        newGuess.status = "popular";
      } else if (result.status === "popular") {
        newGuess.status = "popular";
      }

    } else {
      newGuess.status = "wrong";
    }

    this.guesses.push(newGuess);
    return newGuess;
  }

  checkAnswer (answerQuery) {
    this.answerBank.forEach((answer) => {
      if (answer.id === answerQuery) {
        return answer.status;
      }
    })
  }

  generateAnswerPool () {
    const poolObject = buildPool(5);
    poolObject.bank.forEach((answer) => {
      const newAnswer = new Answer (answer, 5);
      this.answerBank.push(newAnswer);
    });
    console.log(JSON.stringify(this.answerBank));
  }


}


module.exports = Round;
