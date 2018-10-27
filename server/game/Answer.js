class Answer {
  constructor (correctAnswer, seed, pointValue) {
    this.id = correctAnswer;
    this.seed = seed;
    this.status = "unguessed";
    this.pointValue = pointValue;
  }
}

module.exports = Answer;