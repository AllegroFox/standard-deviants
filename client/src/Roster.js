import React, { Component } from 'react';
import UserInRoom from './UserInRoom';

class Roster extends Component {

  render() {
    const  playerItems = this.props.players.map(player => (
      <UserInRoom player={player.name} avatar={player.avatar}/>
      ));
    return (

      <main className="players">
        <ul className="list-group">
          {playerItems}
        </ul>
      </main>

    );
  }
}

export default Roster;