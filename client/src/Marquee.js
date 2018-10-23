import React, { Component } from 'react';

class Marquee extends Component {

  render() {
    return (

      <span className="nav justify-content-center">{this.props.gameState}</span>

    );
  }
}

export default Marquee;