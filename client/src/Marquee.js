import React, { Component } from 'react';

class Marquee extends Component {

  render() {
    return (

      <span className="nav justify-content-center">
        <h4>{this.props.gameState}</h4>
      </span>

    );
  }
}

export default Marquee;