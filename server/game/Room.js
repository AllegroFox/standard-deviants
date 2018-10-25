const Player = require('./Player.js');
const Round = require('./Round.js');

class Room {

  constructor(messager) {
    this.messager = messager;
    this.players = [];
    this.round = null;
  }

  // Instantiate a new round and have it generate an answer pool.
  // In the future, it might be fed a rules module.
  newRound() {
    this.round = new Round(this.messager);
    this.round.generateAnswerPool();
    this.broadcastPrompt();
    this.broadcastScoreboard();
  }

  // When a guess message is received from a player...
  playerGuess(guessObject) {
    // ... tell ROUND to build it into a guess object, check its status, and spit out the results.
    const guess = this.round.checkGuess(guessObject);

    // Check the status of the results and...
    switch (guess.status) {
      case "wrong":
        // ...send the guesser the news that their guess was wrong.
        this.messager.sendClientMessage(
          this.messager.parcelMessage({
            message: "No, you boob!!!",
            guess: guess.guess,
            status: "wrong"
          }, guessObject.clientId, "incomingGuess")
        );
        break;

      case "unique":
        // ...send the guesser the news that their guess was a hit.
        this.messager.sendClientMessage(
          this.messager.parcelMessage({
            message: "You got it, and you were the first one!!!",
            guess: guess.guess,
            status: "unique"
          }, guessObject.clientId, "incomingGuess")
        );
        // TODO: Change [logic] current player's score by guess.pointValue
        this.broadcastScoreboard(guessObject.clientId);
        break;

      case "demotedToPopular":
        // ...send the current guesser their status---it's already been guessed.
        this.messager.sendClientMessage(
          this.messager.parcelMessage({
            message: "You got it, but it's been guessed before.",
            guess: guess.guess,
            status: "popular"
          }, guessObject.clientId, "incomingGuess")
        );
        // ... Also send the first player (who thinks their guess is unique) the bad news.
        const playerToUpdate = (this.round.findGuess(guess));
        this.messager.sendClientMessage(
          this.messager.parcelMessage({
            message: "Bad news, bub. Someone just guessed your unique successful guess.",
            guess: guess.guess,
            status: "popular"
          }, playerToUpdate.player, "incomingGuessState");
        );
        // TODO: Change playerToUpdate.score by guess.pointValue
        this.broadcastScoreboard(playerToUpdate.clientId);
        break;

      case "popular":
        // ...send the player the bad news that their guess is old news.
        this.messager.sendClientMessage(
          this.messager.parcelMessage({
            message: "You got it, but it's been guessed before.",
            guess: guess.guess,
            status: "popular"
          }, guessObject.clientId, "incomingGuess")
        );
        break;

    }
  }

  // When a new client joins...
  playerJoin(protoPlayerObject) {
    // ... instantiate them as a new player object using information sent from the server
    const newPlayer = new Player(protoPlayerObject);
    this.players.push(newPlayer);

    // ... send the player a package with their credentials
    this.messager.sendClientMessage(this.messager.parcelMessage({message: "Hello from deep in the game!", clientId: newPlayer.clientId}, newPlayer.clientId, "incomingPlayerInitialization"));
    this.broadcastPrompt(newPlayer.clientId);

    // ... send everyone else an alert with the new player's credentials.
    this.messager.broadcastMessage(this.messager.parcelMessage({message: `New player, ${newPlayer.handle}, has joined!`}, newPlayer.clientId, "incomingNewPlayer"), true)
  }

  // Broadcasts the objectives of the current round.  If a target is given, instead sends the objectives to just that target.
  broadcastPrompt(target) {
    const content = {
      objective: this.round.objective,
      rules: this.round.rules
    }

    target ?
      this.messager.sendClientMessage(
        this.messager.parcelMessage(
          content, target, "incomingPrompt")
        )

      : this.messager.broadcastMessage(
        this.messager.parcelMessage(
          content, null, "incomingPrompt")
      );
  }

  broadcastScoreboard(target) {
    let content = this.players.map((player) => { return {
        player: player.handle,
        score: player.score
      }
    });

    target ?
      this.messager.sendClientMessage(
        this.messager.parcelMessage(
          content, target, "incomingPrompt")
        )

      : this.messager.broadcastMessage(
        this.messager.parcelMessage(
          content, null, "incomingPrompt")
      );
  }

  // Mutates the score of the identified player
  updateScoreByPlayer(clientId, scoreChange) {
    const result = this.players.find(player => clientId === player.clientId);
    result.score += scoreChange;
  }

}

module.exports = Room;