// #######################
// # Import dependencies #
// #######################

const express = require('express');
// const SocketServer = require('ws').Server;
const WebSocket = require('ws');
const uuidv4 = require('uuid/v4');
const Room = require('./game/Room.js');
const Messager = require('./message-functions.js');
const app = express();


// ############################
// # Passport Authentication: #
// ############################


const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

app.get("/login", (req, res) => {
  // let templateVars = { urls: urlDatabase, user_id: users[req.session.user_id] };
  res.render("login");
})


app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);


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




const messager = new Messager(wss);
const room = new Room(messager);
room.newRound();

// console.log(bob.hello);



// Processes incoming messages by type.  If recognized, re-types the message in preparation for broadcast.  (If a message is not re-typed in this way, it will be caught by the client and log an error message.)
const validateMessage = (messageObject) => {
      switch (messageObject.type) {

      // Log-in: Client sends a requested handle to Server
      case "postLogin":
        room.playerJoined(messageObject);
      break;

      // Submit Guess: Client sends a guess object to the Server
      case "postUpdateHandleAvatar":
        room.updateHandleAvatar(messageObject)
      break;

      // Submit Guess: Client sends a guess object to the Server
      case "postGuess":
        room.playerGuess(messageObject);
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
      case "incomingScoreboard":
        messageObject.type = "incomingScoreboard";
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
    clientId: uuidv4(),
    avatar: "https://api.adorable.io/avatars/285/Bob.png"
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
});

// module.exports = {broadcast};