import React, { Component } from 'react';

class Guess extends Component {

  render() {
    if (this.props.status === "unique"){
      return (
        <span className="badge badge-success">{this.props.guess}: {this.props.status}</span>
      )
    } else if (this.props.status === "popular"){
      return (
        <span className="badge badge-secondary">{this.props.guess}: {this.props.status}</span>
      )
    } else {
      return (
        <span className="badge badge-danger">{this.props.guess}: {this.props.status}</span>
      )
    }
  }
}

export default Guess;
