import React, { Component } from 'react';

class Answer extends Component {

  render() {
    if (this.props.status === "unique"){
      return (
        <span className="badge badge-success">{this.props.word}: {this.props.points}</span>
      )
    } else if (this.props.status === "popular"){
      return (
        <span className="badge badge-secondary">{this.props.word}: {this.props.points}</span>
      )
    } else {
      return (
        <span className="badge badge-dark">{this.props.word}: {this.props.points}</span>
      )
    }
  }
}

export default Answer;
