// #######################
// # Import dependencies #
// #######################

const express = require('express');
// const SocketServer = require('ws').Server;
const WebSocket = require('ws');
const uuidv4 = require('uuid/v4');
const Room = require('./game/Room.js');


// ######################
// # Initialize Server: #
// ######################

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new WebSocket.Server({ server });


// Delivers the message object to all connected users.
const broadcast = (messageObject) => {
    wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(messageObject));
    }
  });
}

// Delivers the message object to all connected users EXCEPT the triggering user.
const broadcastOthers = (messageObject, ws) => {
    wss.clients.forEach(function each(client) {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(messageObject));
    }
  });
}



const room = new Room;

// console.log(bob.hello);


// ################################
// ################################

//   Message-Processing Functions

// ################################
// ################################

// Sends a message to one particular Client.

const sendClientMessage = (messageObject, clientId) => {
  wss.clients.forEach(function each(client) {
    console.log(`client.id: ${client.id}\nmessageObject.content.id: ${messageObject.content.id}`);
    if (clientId === client.id && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(messageObject))
      // console.log(messageObject.content.message);
    }
  })
}

// Fully processes a message: takes the initial object, applies a unique identifier, validates its type, and sends it out for broadcasts to all connected users, or all users excepting the provided socket (in the argument, othersOnly).

const broadcastMessage = (messageObject, othersOnly = false) => {
  messageObject.id = uuidv4();
  validateMessage(messageObject);

  (othersOnly) ? broadcastOthers(messageObject, othersOnly) : broadcast(messageObject);
}


// Processes incoming messages by type.  If recognized, re-types the message in preparation for broadcast.  (If a message is not re-typed in this way, it will be caught by the client and log an error message.)
const validateMessage = (messageObject) => {
      switch (messageObject.type) {

      // Log-in: Client sends a requested handle to Server
      case "postLogin":
        room.playerJoin(messageObject, broadcast, sendClientMessage);
      break;

      // Submit Guess: Client sends a guess object to the Server
      case "postUpdateHandleAvatar":
        room.updateHandleAvatar(messageObject)
      break;

      // Submit Guess: Client sends a guess object to the Server
      case "postGuess":
        round.guessCheck(messageObject);
      break;

      // Server announcement: new Player
      case "incomingNewPlayer":
        messageObject.type = "incomingNewPlayer"
      break;

      // New Game Notification: Server broadcasts rule modules for the game
      case "incomingNewGame":
        messageObject.type = "incomingNewGame";
      break;

      // New Round Notification: Server broadcasts rule modules for the game
      case "incomingNewRound":
        messageObject.type = "incomingNewRound";
      break;

      // Game-State Update Package: status type and timer value
      case "incomingGameState":
        messageObject.type = "incomingNewRound";
      break;

      // Player-Score Update: updated scoreboard
      case "incomingScoreBoard":
        messageObject.type = "incomingScoreBoard";
      break;

      // Guess-State Update: server sends a specific player an updated version of a particular guess
      case "incomingGuessState":
        messageObject.type = "incomingGuessState";
      break;

      // End of Round Notification: broadcast top 3 players, best words, and answer bank
      case "incomingEndOfRound":
        messageObject.type = "incomingGuessState";
      break

      default:
        throw new Error(`Unknown event type: ${messageObject.type}`);

    }
}






// ##########################
// ##########################
// Server-Client Interactions
// ##########################
// ##########################


// ######################
// A new client connects:
// ######################

wss.on('connection', (ws) => {
  // wss.broadcast(greeting);
  console.log('Client connected');
  let newPlayer = {
    type: "postLogin",
    id: uuidv4(),
    avatar: "https://api.adorable.io/avatars/285/Bob.png",
  }
  ws.id = newPlayer.id;
  validateMessage(newPlayer);
  broadcastMessage(room.clientNotifier("Hello from the game room!"));





  // ######################################################
  // A message package is received from a connected client.
  // ######################################################

  ws.on('message', (data) => {
    const dataObject = JSON.parse(data);
    dataObject.clientObject = ws;
    broadcastMessage(dataObject);
  });



  // #####################
  // A client disconnects:
  // #####################

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));

});

// module.exports = {broadcast};