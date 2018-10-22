import React, { Component } from 'react';
import UserInRoom from './UserInRoom';

class Roster extends Component {

  render() {
    const  playerItems = this.props.players.map(player => (
      <UserInRoom player={player.name} avatar={player.avatar}/>
      ));
    return (

      <main className="players">
        <div className="player">
          {playerItems}
        </div>
      </main>

    );
  }
}

export default Roster;