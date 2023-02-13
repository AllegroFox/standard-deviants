import React, { Component } from 'react';

class UserInRoom extends Component {

  render() {
    return (

      <li className="list-group-item" id="active-player">
        <img src={'https://api.dicebear.com/5.x/thumbs/svg?size=60&seed=' + this.props.player} className="tiny-profile-img" alt=""/>
        {this.props.player}
        <span className="badge badge-primary badge-pill">{this.props.score}</span>
      </li>

    );
  }
}

export default UserInRoom;
