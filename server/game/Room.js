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
    this.round = new Round;
  }

  playerGuess (guessObject) {
    const guess = this.round.checkGuess(guessObject);
    if (guess.status === "wrong") {
      this.messager.sendClientMessage(this.serverMessageFormatter({message: "No, you boob!!!"}, guessObject.clientId, "incomingGuessState"));
    } else if (guess.status === "unique") {
      this.messager.sendClientMessage(this.serverMessageFormatter({message: "You got it, and you were the first one!!!"}, guessObject.clientId, "incomingGuessState"));
    } else if (guess.status === "popular") {
      this.messager.sendClientMessage(this.serverMessageFormatter({message: "You got it, but it's been guessed before."}, guessObject.clientId, "incomingGuessState"));
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