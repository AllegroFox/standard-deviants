Room
{
  players:            [{player}, {player}, {player}]
  guessReceived:      function (player, guess) => {checks guess against currentRound.answerBank}
  currentRound:       {round}
}

Round
{
  getPrompt:          function () => {}  // Does something to get a word/syllable/etc and check its validity.
  rules:              ""  // Rules reminder
  prompt:             "Target word"
  answerBank:         [{word}, {word}, {word}]
  guesses:            [{guess}, {guess}, {guess}]

}

Guess
{
  player:             player
  guess:              ""  // word guessed
  "wrong?":           false

}

Answer
{
  id:                 ""  // answer identified by API
  status:             ""  // "unguessed", "unique", "popular"

}

ScoreModule
{
  calculateWordValue: function (word) => {...returns integer}
}

Player
{
  id:           ""  // player's handle
  avatar:       ""  // URL of player's avatar picture
  score:        0
  changeScore (amount) => { this.score += amount }
}
