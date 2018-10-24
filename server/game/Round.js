const Guess = require('./Guess.js');
const Answer = require('./Answer.js');
const buildPool = require ('./gameModules/bank-gen-synonyms.js');

class Round {

  constructor (messager) {
    this.messager = messager;
    this.guesses = [];
    this.answerBank = [{id: "victory", status: "unguessed", pointValue: 0}, {id: "spoon", status: "unguessed", pointValue: 0}];
    this.objective = "";
  }

  checkGuess (guessObject) {
    const newGuess = new Guess(guessObject);
    const result = this.answerBank.find(answer => newGuess.guess.toLowerCase() === answer.id)

    if (result) {

      switch (results.status) {
        case "unguessed":
          result.status = "unique";
          newGuess.status = "unique";
          break;
        case "unique":
          result.status = "popular";
          newGuess.status = "demotedToPopular";
          break;
        case "popular":
          newGuess.status = "popular";
          break;
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
    console.log(JSON.stringify(JSON.stringify(poolObject.targets)));
  }

  findGuess(guessObject) {
    const result = this.guesses.filter(collectedGuess => (
      collectedGuess.guess === guessObject.guess && collectedGuess.player !== guessObject.player))
    console.log(`findGuess produced: ${JSON.stringify(result)}`);
  }

}


module.exports = Round;
