import React, { Component } from 'react';
import './App.css';

class App extends Component {

  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
  }

  render() {
    return (
      <h1> We are standard deviants.  Good. </h1>
    );
  }
}

export default App;
