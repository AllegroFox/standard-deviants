import React, { Component } from 'react';

class UserInRoom extends Component {

  render() {
    return (

      <li className="list-group-item">
        {this.props.player}
        <span className="badge badge-primary badge-pill">{this.props.score}</span>
      </li>

    );
  }
}

export default UserInRoom;