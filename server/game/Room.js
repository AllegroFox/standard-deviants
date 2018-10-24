const Player = require('./Player.js');
const Round = require('./Round.js');

class Room {

  constructor (messager) {
    this.messager = messager;
    this.players = [];
    this.round = null;
  }

  //  This could be a class method, rather than an instance method.
  serverMessageFormatter (content, addresseeId, type) {
    return {
      content: content,
      clientId: addresseeId,
      type: type
    }
  }

  newRound () {
    this.round = new Round(this.messager);
    this.round.generateAnswerPool();
  }

  playerGuess (guessObject) {
    const guess = this.round.checkGuess(guessObject);

    switch (guess.status) {
      case "wrong":
        // Send the guesser the news that their guess was wrong.
        this.messager.sendClientMessage(this.serverMessageFormatter({message: "No, you boob!!!", guess: guess.guess, status: guess.status}, guessObject.clientId, "incomingGuess"));
        break;

      case "unique":
        // Send the guesser the news that their guess was a hit.
        this.messager.sendClientMessage(this.serverMessageFormatter({message: "You got it, and you were the first one!!!", guess: guess.guess, status: guess.status}, guessObject.clientId, "incomingGuess"));
        break;

      case "demotedToPopular":
        // Send the original guesser their status.
        this.messager.sendClientMessage(this.serverMessageFormatter({message: "You got it, but it's been guessed before.", guess: guess.guess, status: guess.status}, guessObject.clientId, "incomingGuessState"));
        // ... Also send the other player (who thinks their guess is unique) the bad news.
        const playerToUpdate = (this.round.findGuess(guess));
        this.messager.sendClientMessage(this.serverMessageFormatter({message: "Bad news, bub. Someone just guessed your unique successful guess.", guess: guess.guess, status: guess.status}, playerToUpdate.player, "incomingGuessState"));
        break;

      case "popular":
        this.messager.sendClientMessage(this.serverMessageFormatter({message: "You got it, but it's been guessed before.", guess: guess.guess, status: guess.status}, guessObject.clientId, "incomingGuessState"));
        break;

    }
  }

  playerJoin (protoPlayerObject) {
    const newPlayer = new Player(protoPlayerObject);
    this.players.push(newPlayer);
    console.log(`sendClientMessage to ${newPlayer.clientId}`);
    this.messager.sendClientMessage(this.serverMessageFormatter({message: "Hello from deep in the game!", clientId: newPlayer.clientId}, newPlayer.clientId, "incomingPlayerInitialization"));
    this.messager.broadcastMessage(this.serverMessageFormatter({message: `New player, ${newPlayer.handle}, has joined!`}, newPlayer.clientId, "incomingNewPlayer"), true)

    console.log(`Game says: my players are now ${this.players}`);
  }


}

module.exports = Room;