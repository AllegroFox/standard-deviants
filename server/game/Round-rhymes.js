const Guess = require('./Guess.js');
const Answer = require('./Answer.js');
const buildPool = require ('./gameModules/bank-gen-rhymes.js');

class Round {

  constructor (messager) {
    this.messager = messager;
    this.guesses = [];
    this.answerBank = [{id: "victory", status: "unguessed", pointValue: 0}, {id: "spoon", status: "unguessed", pointValue: 0}];
    this.gameModule = "Rhyme Shotgun!"
    this.marqueeForGetGuessing = "Guess the rhymes!"
    this.marqueeForGetResults = "Top ten possible answers, plus the room's best efforts...";
    // this.guessingPeriod = 45;
    this.guessingPeriod = 15;
    this.objective = [];
    this.rules = {
      rules: "Find rhymes for either of the above words.",
      scoring: "Score massive bonuses for rhymes with more syllables."
    }
  }

  checkGuess(guessObject) {
    const newGuess = new Guess(guessObject);
    const result = this.answerBank.find(answer => newGuess.guess.toLowerCase() === answer.id)

    if (result) {

      switch (result.status) {
        case "unguessed":
          result.status = "unique";
          newGuess.status = "unique";
          newGuess.pointValue = result.pointValue;
          break;
        case "unique":
          result.status = "popular";
          newGuess.status = "demotedToPopular";
          newGuess.pointValue = -(result.pointValue);

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

  async generateAnswerPool() {
    const poolObject = await buildPool(200);
    poolObject.bank.forEach((answer) => {
      const pointValue = (answer.numSyllables * answer.numSyllables * answer.numSyllables) + 1;
      const newAnswer = new Answer (answer.answer, answer.seed, pointValue);
      this.answerBank.push(newAnswer);
    });
    this.answerBank.sort(function(a, b) {return b.pointValue - a.pointValue});
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
