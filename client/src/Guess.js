import React, { Component } from 'react';

class Guess extends Component {

  render() {
    if (this.props.status === "unique"){
      return (
        <div className="text-success">{this.props.guess}: {this.props.status}</div>
      )
    } else if (this.props.status === "popular"){
      return (
        <div className="text-white-50">{this.props.guess}: {this.props.status}</div>
      )
    } else {
      return (
        <div className="text-danger">{this.props.guess}: {this.props.status}</div>
      )
    }
  }
}

export default Guess;


// dynamic classes: red (.text-danger), green (.text-success), faded (.text-white-50)