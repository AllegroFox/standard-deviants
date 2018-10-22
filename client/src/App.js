import React, { Component } from 'react';
import './App.css';
import NavBar from './Navbar';
import InputBar from './InputBar';
import Prompt from './Prompt';
import GuessBank from './GuessBank';
import Roster from './Roster';
import SystemUpdates from './SystemUpdates';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = { gameType   : "Syllybles",
                   gameState  : "Get Ready!",
                   timeLeft   : 180,
                   currentUser: "Anonymous",
                   guesses    : [],
                   connectedPlayers: [],
                   systemUpdates   : [],
                   prompt     : {objective: "targetWord", rules: "Some rules" } }

    this.onKeyPress = this.onKeyPress.bind(this);
    this.socket = null;
  }

  componentDidMount() {

    // Connection is attempted.
    this.socket = new WebSocket("ws://localhost:3001");

    // Successful connection is reported to the client.
    this.socket.onopen = function (event) {
      console.log("The server welcomes you.");
    };

    this.socket.onmessage = event => {
        const message = JSON.parse(event.data);

        switch(message.type) {
          case "incomingLogin":
            console.log(message);

            break;

          case "incomingGuess":

            console.log(message);

            break;

          case "incomingGuessState":

            console.log(message);

            break;

          case "incomingNewGame":

            console.log(message);

            break;

          case "incomingNewRound":

            console.log(message);

            break;

          case "incomingGameState":

            console.log(message);

            break;

          case "incomingScoreBoard":

            console.log(message);

            break;

          case "incomingEndOfRound":

            console.log(message);

            break;

          default:
            throw new Error("Unknown message type: " + message.type);
        }
      }
    };

  onKeyPress(key) {

  }

  render() {
    return (
      <div>
        <NavBar gameType={this.state.gameType} gameState={this.state.gameState} timeLeft={this.state.timeLeft} currentUser={this.state.currentUser}/>
        <h1> We are standard deviants.  Good. </h1>
        <Prompt prompt={this.state.prompt}/>
        <GuessBank guesses={this.state.guesses}/>
        <Roster players={this.state.connectedPlayers}/>
        <SystemUpdates systemUpdates={this.state.systemUpdates}/>
        <InputBar/>
      </div>
    );
  }
}

export default App;
