import React, { Component } from 'react';

class Guess extends Component {

  render() {
    return (

      <div>{this.props.guess}: {this.props.status}</div>

    );
  }
}

export default Guess;