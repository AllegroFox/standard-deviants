const WebSocket = require('ws');
const uuidv4 = require('uuid/v4');


class Messager {

  constructor (wss) {
    this.wss = wss;
  }

  // Fully processes a message: takes the initial object, applies a unique identifier, validates its type, and sends it out for broadcasts to all connected users, or all users excepting the provided socket (in the argument, othersOnly).

  broadcastMessage (messageObject, othersOnly) {
    // If the messageObject hasn't already been stamped with its own id, stamp it now.  This would only be true in the case of a message sent by the game, not by a user.
    messageObject.id = messageObject.id || uuidv4();
    (othersOnly) ? this.broadcastOthers(messageObject) : this.broadcast(messageObject);
  }

  // Delivers the message object to all connected users.
  broadcast (messageObject) {
      this.wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(messageObject));
      }
    });
  }

  // Delivers the message object to all connected users EXCEPT the triggering user.
  broadcastOthers (messageObject) {
      this.wss.clients.forEach((client) => {
        console.log(`BroadcastOthers is getting a message with client id ${client.clientId}`)
      if (client.clientId !== messageObject.clientId && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(messageObject));
      }
    });
  }

  // Sends a message to one particular Client.
  sendClientMessage (messageObject) {
    this.wss.clients.forEach(function each(client) {
      if (messageObject.clientId === client.clientId && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(messageObject))
      }
    });
  }

  parcelMessage (content, addresseeId, type) {
    return {
      content: content,
      clientId: addresseeId,
      type: type
    }
  }

}


module.exports = Messager;