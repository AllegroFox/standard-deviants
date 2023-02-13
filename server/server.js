// #######################
// # Import dependencies #
// #######################

const express = require('express');
// const SocketServer = require('ws').Server;
const WebSocket = require('ws');
const uuidv4 = require('uuid/v4');
const Room = require('./game/Room.js');
const Messager = require('./message-functions.js');


const {MongoClient} = require("mongodb");
const MONGODB_URI = "mongodb://127.0.0.1:27017/phig";
const Database = require('./database-functions.js');

// ######################
// # Initialize Server: #
// ######################

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new WebSocket.Server({ server });

// #######################
// # Connect to MongoDB: #
// #######################

MongoClient.connect(MONGODB_URI, (err, db) => {

  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  console.log(`Connected to mongodb: ${MONGODB_URI}`);
  // const dbHelper = require("./game/gameModules/database-helpers.js")(db);


  const database = new Database(db);
  const messager = new Messager(wss);
  const room = new Room(messager, database);
  room.startGetReady();

  // console.log(bob.hello);


  // to add data:
  // let dataToAdd = {
  //   playerId: "asdf",
  //   type: "persistScoreboard",
  //   value: 9, timestamp: new Date(),
  //   word: "refrigerator"
  // }
  // database.addData(dataToAdd);

  // to find data:
  // let query = {
  //   type: "persistScoreboard"
  // }
  // database.getData(query);

  // to delete an existing player:
  // let dataToDelete =  {
  //   type: 'persistScoreboard',
  //   criteria: { _id: '5bd37818f032c406a138dc4a' }
  // }
  // database.deleteData(dataToDelete);


  // Processes incoming messages by type.  If recognized, re-types the message in preparation for broadcast.  (If a message is not re-typed in this way, it will be caught by the client and log an error message.)
  const validateMessage = (messageObject) => {
        switch (messageObject.type) {

        // Log-in: Client sends a requested handle to Server
        case "postLogin":
          room.playerJoined(messageObject);
        break;

        // Client sends an updated handle to the server.
        case "postUpdateHandle":
          room.updateHandle(messageObject);
        break;

        // Submit Guess: Client sends a guess object to the Server
        case "postUpdateHandleAvatar":
          // to add a new user:
          // let newUser = {
          //   playerId: "Bobby12345678",
          //   handle: "BobbysHandleName",
          //   avatar: "www.example.com",
          //   createdAt: new Date()
          // };
          // dbHelper.addUser(newUser);
        break;

        // Submit Guess: Client sends a guess object to the Server
        case "postGuess":
          room.playerGuess(messageObject);
        break;

        case "postGetLeaderboard":
          room.updateLeaderboard(messageObject.clientId);
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
        case "incomingGetReady":
          messageObject.type = "incomingGetReady";
        break;

        // Game-State Update Package: status type and timer value
        case "incomingGameState":
          messageObject.type = "incomingGetReady";
        break;

        // Player-Score Update: updated scoreboard
        case "incomingScoreboard":
          messageObject.type = "incomingScoreboard";
        break;

        // Guess-State Update: server sends a specific player an updated version of a particular guess
        case "incomingGuessState":
          messageObject.type = "incomingGuessState";
        break;

        // End of Round Notification: broadcast top 3 players, best words, and answer bank
        case "incomingResults":
          messageObject.type = "incomingGuessState";
        break;

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
    clientId: uuidv4(),
    handle: "default",
    avatar: "https://api.dicebear.com/5.x/thumbs/svg?size=285&seed="

  }

    ws.clientId = newPlayer.clientId;
    validateMessage(newPlayer);
    // broadcastMessage(`Please welcome ${newPlayer.handle} to the game!`);


    // ######################################################
    // A message package is received from a connected client.
    // ######################################################

    // Stamps the message with the client's ws identity, gives it a unique id to keep React happy, and sends it on to the switchboard.
    ws.on('message', (data) => {
      const dataObject = JSON.parse(data);
      dataObject.id = uuidv4();
      dataObject.clientId = ws.clientId;
      validateMessage(dataObject);
    });



    // #####################
    // A client disconnects:
    // #####################

    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
    ws.on('close', () => {
      const departingPlayerClientId = ws.clientId;
      console.log(`Player has left.  ws.clientId was ${departingPlayerClientId}`)
      room.playerLeft(departingPlayerClientId);
    });

  }); // closing bracket for wss.on('connection')

}); // closing bracket for mongoDB connection

// module.exports = {broadcast};
