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
    if (this.round.checkGuess(guessObject)) {
      this.messager.sendClientMessage(this.serverMessageFormatter({message: "You got it!!!"}, guessObject.clientId, "incomingGuessState"));
    } else {
      this.messager.sendClientMessage(this.serverMessageFormatter({message: "No, you boob!!!"}, guessObject.clientId, "incomingGuessState"));
    }
  }

  playerJoin (protoPlayerObject) {
    // console.log(JSON.stringify(playerObject));
    const newPlayer = new Player(protoPlayerObject);
    this.players.push(newPlayer);
    // const message = this.clientNotifier("Hello from DEEP INSIDE THE GAME.");
    // message.id = playerObject.id;
    // console.log(JSON.stringify(message));
    console.log(`sendClientMessage to ${newPlayer.clientId}`);
    this.messager.sendClientMessage(this.serverMessageFormatter({message: "Hello from deep in the game!", clientId: newPlayer.clientId}, newPlayer.clientId, "incomingPlayerInitialization"));
    this.messager.broadcastMessage(this.serverMessageFormatter({message: `New player, ${newPlayer.handle}, has joined!`}, newPlayer.clientId, "incomingNewPlayer"), true)

    console.log(`Game says: my players are now ${this.players}`);
  }


}

module.exports = Room;