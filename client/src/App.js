import React, { Component } from 'react';
import './App.css';
import './gameRoom.css';
import NavBar from './Navbar';
import InputBar from './InputBar';
import Prompt from './Prompt';
import GuessBank from './GuessBank';
import Roster from './Roster';
import SystemUpdates from './SystemUpdates';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = { gameType   : "Syllynyms",
                   gameState  : "Get Ready!",
                   timeLeft   : 180,
                   currentUser: "Anonymous",
                   clientId   : "",
                   guesses    : ['blue', 'red', 'grey'],
                   connectedPlayers: ["AllegroFox", "StandardGiraffe", "CalmingManatee"],
                   systemUpdates   : ["some", "system", "messages"],
                   prompt     : {objective: "targetWord", rules: "Some rules" },
                   guessBarContent: ""
                 }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

            console.log(`Type: ${message.type}; "${message.content}"`);

            break;

          case "incomingNewPlayer":
            console.log(`Type: ${message.type}; "${message.content.message}"`);

            break;

          case "incomingGuess":

            console.log(`Type: ${message.type}; "${message.content}"`);

            break;

          case "incomingGuessState":

            console.log(`Type: ${message.type}; "${message.content}"`);

            break;

          case "incomingNewGame":

            console.log(`Type: ${message.type}; "${message.content}"`);

            break;

          case "incomingNewRound":

            console.log(`Type: ${message.type}; "${message.content}"`);

            break;

          case "incomingGameState":

            console.log(`Type: ${message.type}; "${message.content}"`);

            break;

          case "incomingScoreBoard":

            console.log(`Type: ${message.type}; "${message.content}"`);

            break;

          case "incomingEndOfRound":

            console.log(`Type: ${message.type}; "${message.content}"`);

            break;

          // Received when a player first connects and is initialized as an object within the game room.
          case "incomingPlayerInitialization":
            this.setState({clientId: message.content.clientId});
            console.log(`Player, you have been initialized by the game room!`);
            break;

          default:
            throw new Error("Unknown message type: " + message.type);
        }
      }
    };

  handleChange(event) {
    this.setState({guessBarContent: event.target.value});
    console.log(`Field value: ${event.target.value}`);
  }

  handleSubmit(event) {
    if (event.key === 'Enter') {

      this.setState({guessBarContent: ""});
    }
  }

  clientMessageFormatter (content, type) {
    return {
      content: content,
      clientId: this.clientId,
      type: type
    }
  }

  render() {
    return (
      <div className="game-window container-fluid">
        <NavBar gameType={this.state.gameType} gameState={this.state.gameState} timeLeft={this.state.timeLeft} currentUser={this.state.currentUser}/>
        <div className="row">
          <div className="col-md-8">
            <h1> We are standard deviants.  Good. </h1>
            <Prompt prompt={this.state.prompt}/>
            <GuessBank guesses={this.state.guesses}/>
            <InputBar
              value={this.state.guessBarContent}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              />
          </div>
          <div className="col-md-4">
            <Roster players={this.state.connectedPlayers}/>
            <SystemUpdates systemUpdates={this.state.systemUpdates}/>
          </div>
          <footer className="fixed-bottom">
            <span>Standard-Deviants 2018</span>
          </footer>
        </div>
      </div>
    );
  }
}

export default App;
