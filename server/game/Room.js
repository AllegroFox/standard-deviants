const Player = require('./Player.js');
// const {broadcast} = require('../server.js');


class Room {

  constructor () {
    this.hello = "You found me.",
    this.players = []
    // broadcast()
  }

  //  This could be a class method, rather than an instance method.
  clientNotifier (content) {
    return {
      content: content,
      type: "incomingScoreBoard"
    }
  }

  playerJoin (playerObject, broadcast, sendClientMessage) {
    // console.log(JSON.stringify(playerObject));
    const newPlayer = new Player(playerObject);
    this.players.push(newPlayer);
    const message = this.clientNotifier("Hello from DEEP INSIDE THE GAME.");
    message.id = playerObject.id;
    // console.log(JSON.stringify(message));
    sendClientMessage(this.clientNotifier(message), newPlayer.id);
    console.log(`Game says: my players are now ${this.players}`);
  }


}

module.exports = Room;