# Client-Server Interactions
The purpose of this scratch is to document the types of information sent from client to server and vice-versa.


# Server messages to the Client(s)

## "Log-in"
Client sends a requested handle to Server
Server broadcasts new player has joined + identity to all other clients.
<!-- Server inactivates that player -->

## "Log-out"
Client closes the websocket
Server broadcasts that that player has disconnected
? Server asks all answers to be recalculated (optional, crazy)
? Server broadcasts the scores

## New Game Notification
Server broadcasts rule modules for the game

## New Round Notification
Server broadcasts rule modules for the game (maybe scoring changes)
Server broadcasts the new objective
<!-- Server unlocks all inactive players -->


## Game-State Update Package
Server broadcasts:
- Status type (Submit Answers / Vote / Rest / Get Ready)
- Timer value (# of seconds remaining in the game state)

## Player-Score Update
Server broadcasts:
- Updated Scoreboard [{playername: score}, {playername: score}...]

## Guess-State Update
Server sends a specific player an updated version of a particular guess (because its status changed from "unique" to "popular")

## End of Round Notifiction
Server broadcasts:
- Top three players and their scores
- Best words
- The answer bank and the final status of all answers



# Client Messages to the Server

## Client Joins
Client submits handle and avatar choice
{ClientId, handle, avatarId}

## Submit Guess
Client sends a guess object to the Server
{ClientId, guess}

## Submit Vote
Client registers a vote choice
{ClientId, choice#}

## Submit Chat
Client submits a chat message
{ClientId, messageString}

