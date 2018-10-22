// #######################
// # Import dependencies #
// #######################

"use strict";

const {MongoClient} = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/standardDeviants";


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

// #######################
// # Connect to MongoDB: #
// #######################

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  function getData(callback) {
    db.collection("inventory").find().toArray(callback);
  }

  // Saves new data `db`
  function saveData(newData, callback) {
    db.collection("inventory").insertOne(newData);
    callback(null, true);
  }

  getData((err, data) => {
    if (err) throw err;

    console.log("Logging each data in inventory:");
    for (let d of data) {
      console.log(d);
    }
    db.close();
  });

  // Database testing:
  let testData = {
    "item": "test",
    "qty": 25,
    "status": "test",
    "size": { "h" : 14, "w" : 21, "uom" : "cm" },
    "tags": [ "blank", "red" ]
  }
  saveData(testData);
  // getData();

});





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

      case "postUserUpdate":
        messageObject.type = "incomingSystemMessage";
      break;

      case "postMessage":
        messageObject.type = "incomingMessage";
      break;

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


// ######################
// A new client connects:
// ######################

wss.on('connection', (ws) => {
  // wss.broadcast(greeting);
  console.log('Client connected');




  // ######################################################
  // A message package is received from a connected client.
  // ######################################################

  ws.on('message', (data) => {
    const dataObject = JSON.parse(data);
    broadcastMessage(dataObject);
  });



  // #####################
  // A client disconnects:
  // #####################

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));

});