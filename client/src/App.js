import React, { Component } from 'react';
import './App.css';
import NavBar from './Navbar';
import InputBar from './InputBar';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = { gameType   : "Syllybles",
                   gameState  : "Get Ready!",
                   timeLeft   : 180,
                   currentUser: "Anonymous" }
  }

  componentDidMount() {

    // Connection is attempted.
    this.socket = new WebSocket("ws://localhost:3001");

    // Successful connection is reported to the client.
    this.socket.onopen = function (event) {
      console.log("The server welcomes you.");
    }
  }

  render() {
    return (
      <div>
        <NavBar gameType={this.state.gameType} gameState={this.state.gameState} timeLeft={this.state.timeLeft} currentUser={this.state.currentUser}/>
        <h1> We are standard deviants.  Good. </h1>
        <Prompt/>
        <GuessBank/>
        <Roster/>
        <InputBar/>
      </div>
    );
  }
}

export default App;
