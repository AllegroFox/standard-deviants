// Packages the round statistics.

module.exports = function roundEndResults() {
  const roundStats = {};
  roundStats.answerBank = [];

  // Pop in the objectives/defintions.
  roundStats.answerBank[0] = {
    target: this.round.objective[0].word,
    definition: this.round.objective[0].hint
  };
  roundStats.answerBank[1] = {
    target: this.round.objective[1].word,
    definition: this.round.objective[1].hint
  };

  // Sort through the answer bank and sort the answers according to their initial seed.  This is my first ever array.reduce!  Whoop whoop. -D
  roundStats.answerBank[0].bank = [];
  roundStats.answerBank[1].bank = [];
  roundStats.answerBank = this.round.answerBank.reduce( (acc, next) => {
    (next.seed === 0) && acc[0].bank.push(next);
    (next.seed === 1) && acc[1].bank.push(next);
    return acc;
  }, roundStats.answerBank);

  // Finally, tack on the final scoreboard.
  const finalScoreboard = this.players.map((player) => { return {
      handle: player.handle,
      score: player.score
    }
  }).sort(function (a, b) {
    return b.score - a.score;
  });

  roundStats.finalScoreboard = finalScoreboard;

  return roundStats;
}