import React, { Component } from 'react';
import './App.css';

class App extends Component {

  // constructor(props) {
  //   super(props);
  // }

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
      <h1> We are standard deviants.  Good. </h1>
    );
  }
}

export default App;
