import React, { Component } from 'react';

class UserInRoom extends Component {

  render() {
    return (

      <li className="list-group-item">
        <img src={'https://api.adorable.io/avatars/60/' + this.props.player + '.io.png'} className="tiny-profile-img"/>
        {this.props.player}
        <span className="badge badge-primary badge-pill">{this.props.score}</span>
      </li>

    );
  }
}

export default UserInRoom;