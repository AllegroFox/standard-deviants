const Player = require('./Player.js');
// const {broadcast} = require('../server.js');


class Room {

  constructor () {
    this.hello = "You found me.",
    this.players = []
    // broadcast()
  }

  //  This could be a class method, rather than an instance method.
  serverMessageFormatter (content, addresseeId, type) {
    return {
      content: content,
      clientId: addresseeId,
      type: type
    }
  }

  playerJoin (playerObject, broadcastMessage, sendClientMessage) {
    // console.log(JSON.stringify(playerObject));
    const newPlayer = new Player(playerObject);
    this.players.push(newPlayer);
    // const message = this.clientNotifier("Hello from DEEP INSIDE THE GAME.");
    // message.id = playerObject.id;
    // console.log(JSON.stringify(message));
    console.log(`sendClientMessage to ${newPlayer.clientId}`);
    sendClientMessage(this.serverMessageFormatter({message: "Hello from deep in the game!"}, newPlayer.clientId, "incomingNewPlayer"));
    broadcastMessage(this.serverMessageFormatter({message: `New player, ${newPlayer.handle}, has joined!`}, newPlayer.clientId, "incomingNewPlayer"), true)

    console.log(`Game says: my players are now ${this.players}`);
  }


}

module.exports = Room;