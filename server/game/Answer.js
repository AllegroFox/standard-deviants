class Answer {
  constructor (correctAnswer, pointValue) {
    this.id = correctAnswer;
    this.status = "unguessed";
    this.pointValue = pointValue;
  }
}

module.exports = Answer;