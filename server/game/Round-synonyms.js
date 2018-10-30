const Guess = require('./Guess.js');
const Answer = require('./Answer.js');
const buildPool = require ('./gameModules/bank-gen-synonyms.js');
const scrabbleScore = require ('scrabble-score');

class Round {

  constructor (messager) {
    this.messager = messager;
    this.guesses = [];
    this.answerBank = [{id: "victory", status: "unguessed", pointValue: 0}, {id: "spoon", status: "unguessed", pointValue: 0}];
    this.gameModule = "Vein Seeker";
    this.marqueeForGetGuessing = "Guess the synonyms!";
    this.marqueeForGetResults = "Everyone's results...";
    this.inputBarMessage = "Guess a synonym!";
    this.guessingPeriod = 75;  // Standard game length
    // this.guessingPeriod = 15;  // Testing game length
    this.resultsPeriod = 15;
    this.objective = [];
    this.rules = {
      rules: "Guess synonyms for either of the above words.  (Pay close attention to the definitions and parts of speech!)",
      scoring: "Longer words with unusual letters score more points.",
      promptBanner: "SYNONYMS ROUND!"
    };
    this.resultsHelperLabel = "synonyms";

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
    const poolObject = await buildPool(50);
    poolObject.bank.forEach((answer) => {
      const newAnswer = new Answer (answer.answer, answer.seed, (scrabbleScore(answer.answer)) + answer.answer.length);
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
