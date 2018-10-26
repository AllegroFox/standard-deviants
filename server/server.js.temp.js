// #######################
// # Import dependencies #
// #######################

const express = require('express');
// const SocketServer = require('ws').Server;
const WebSocket = require('ws');
const uuidv4 = require('uuid/v4');


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






// ################################
// ################################

//   Message-Processing Functions

// ################################
// ################################


// Fully processes a message: takes the initial object, applies a unique identifier, validates its type, and sends it out for broadcasts to all connected users, or all users excepting the provided socket (in the argument, othersOnly).

const broadcastMessage = (messageObject, othersOnly = false) => {
  messageObject.id = uuidv4();
  validateMessage(messageObject);

  (othersOnly) ? broadcastOthers(messageObject, othersOnly) : broadcast(messageObject);
}

// Processes incoming messages by type.  If recognized, re-types the message in preparation for broadcast.  (If a message is not re-typed in this way, it will be caught by the client and log an error message.)
const validateMessage = (messageObject) => {
      switch (messageObject.type) {

      // case "postUserUpdate":
      //   messageObject.type = "incomingSystemMessage";
      // break;

      // case "postMessage":
      //   messageObject.type = "incomingMessage";
      // break;

      // Log-in: Client sends a requested handle to Server

      case "postLogin":
        messageObject.type = "incomingLogin";
      break;

      // Submit Guess: Client sends a guess object to the Server
      case "postGuess":
        messageObject.type = "incomingGuess";
      break;

      // Default: shows an error in the console if the message type is unknown
      default:
        throw new Error(`Unknown event type: ${dataObject.type}`);

    }
}

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






// ##########################
// ##########################
// Server-Client Interactions
// ##########################
// ##########################


// ###################
// Active Connections:
// ###################

wss.on('connection', (ws) => {

  // Number of players connected
  let playersConnected = {
      type: "playerCount",
      content: wss.clients.size
  }
  // wss.broadcast(JSON.stringify(usersConnected));

  // a new client connects
  console.log('New client connected');
  // broadcastMessage(dataObject);


  // ################################
  // Server messages to the Client(s)
  // ################################

  // New Game Notification: Server broadcasts rule modules for the game
  const round = new Round {
    getPrompt: function(),
    rules: "",
    prompt: "Objective Word",
    answerBank: [],
    guesses: []
  }
  dataObject.type = "incomingNewGame";
  dataObject.rules = round.rules;
  dataObject.prompt = round.prompt;
  wss.broadcast(JSON.stringify(dataObject));

  // New Round Notification: Server broadcasts rule modules for the game
  const round = new Round {
    getPrompt: function(),
    rules: "",
    prompt: "Objective Word",
    answerBank: [],
    guesses: []
  }
  dataObject.type = "incomingNewRound";
  dataObject.rules = round.rules;
  dataObject.prompt = round.prompt;
  wss.broadcast(JSON.stringify(dataObject));

  // Game-State Update Package: status type and timer value
  dataObject.type = "incomingGameState"
  dataObject.status =
  dataObject.timer =
  wss.broadcast(JSON.stringify(dataObject));

  // Player-Score Update: updated scoreboard
  dataObject.type = "incomingScoreboard";
  dataObject.scoreboard = ???;
  wss.broadcast(JSON.stringify(dataObject));

  // Guess-State Update: server sends a specific player an updated version of a particular guess
  dataObject.type = "incomingGuessState";
  dataObject.guess = "popular"??????
  // wss.clients.forEach(function(el){
  //   if(el.username==msg.target){
  //     if(el && el.readyState==1) el.send(JSON.stringify(msg)
  //   }})
  // }
  wss.clients.forEach(function(ClientId){
    if (ClientId === dataObject.target) {
      if (ClientId && ClientId.readyState === 1) ClientId.send(JSON.stringify(dataObject)
    }})


  // End of Round Notification: broadcast top 3 players, best words, and answer bank
  dataObject.type = "incomingEndOfRound"
  // dataObject.top3
  // dataObject.bestWords
  // dataObject.answerBank
  wss.broadcast(JSON.stringify(dataObject));

  // ######################################################
  // A message package is received from a connected client.
  // ######################################################

  ws.on('message', (data) => {
    const dataObject = JSON.parse(data);
    // broadcastMessage(dataObject);
    dataObject.id = uuidv4();

    switch (msg.type) {

      // Log-in: Client sends a requested handle to Server
      // case "postLogin":

      //   const player = new Player
      //     {
      //       id: dataObject.handle,
      //       avatar: dataObject.avatarId,
      //       score: 0
      //       clientObject = ws
      //     }
      //   room.addPlayer(dataObject)
      //   dataObject.type = "incomingLogin";
      //   // wss.broadcast(JSON.stringify(outgoingObject));
      //   break;

      // Submit Guess: Client sends a guess object to the Server
      // case "postGuess":
      //   const guess = new Guess {
      //     player: dataObject.ClientId,
      //     guess: dataObject.guess,
      //     "wrong?": false,
      //     status:
      //   }
      //   dataObject.type = "incomingGuess";
      //   wss.broadcast(JSON.stringify(dataObject));
      // break;

      // // Default: shows an error in the console if the message type is unknown
      // default:
      //   throw new Error(`Unknown event type: ${dataObject.type}`);

    }

  });


  // #####################
  // A client disconnects:
  // #####################

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  // ws.on('close', () => console.log('Client disconnected'));

  //   // Log-out: Client closes the websocket
  //   // dataObject.ClientId

  //   // on Client side:
  //   // var readyState = aWebSocket.readyState;
  //   // if readyState === 2 then it means it is closing

  //   dataObject.ClientId

  //   dataObject.type = "incomingLogout";
  //   wss.broadcast(JSON.stringify(dataObject));

});