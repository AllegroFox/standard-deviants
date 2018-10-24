const Guess = require('./Guess.js');
const Answer = require('./Answer.js');
const buildPool = require ('./gameModules/bank-gen-synonyms.js');

class Round {

  constructor (messager) {
    this.messager = messager;
    this.guesses = [];
    this.answerBank = [{id: "victory", status: "unguessed", pointValue: 0}, {id: "spoon", status: "unguessed", pointValue: 0}];
    this.objective = [];
    this.rules = "Guess synonyms of the words above.  (Pay close attention to the definitions!)";
  }

  checkGuess(guessObject) {
    const newGuess = new Guess(guessObject);
    const result = this.answerBank.find(answer => newGuess.guess.toLowerCase() === answer.id)

    if (result) {

      switch (result.status) {
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

  checkAnswer(answerQuery) {
    this.answerBank.forEach((answer) => {
      if (answer.id === answerQuery) {
        return answer.status;
      }
    })
  }

  generateAnswerPool() {
    const poolObject = buildPool(5);
    poolObject.bank.forEach((answer) => {
      const newAnswer = new Answer (answer, answer.length);
      this.answerBank.push(newAnswer);
    });
    const target = poolObject.targets;
    this.objective = [
      {word: poolObject.targets[0].word, hint: poolObject.targets[0].definition},
      {word: poolObject.targets[1].word, hint: poolObject.targets[1].definition}
    ];

    // broadcastObjectives();
    console.log(JSON.stringify(JSON.stringify(poolObject.targets)));
  }

  findGuess(guessObject) {
    const result = this.guesses.filter(collectedGuess => (
      collectedGuess.guess === guessObject.guess && collectedGuess.player !== guessObject.player))
    console.log(`findGuess produced: ${JSON.stringify(result)}`);
    return result[0];
  }

}


module.exports = Round;
