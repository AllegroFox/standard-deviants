import React, { Component } from 'react';
import UserInRoom from './UserInRoom';
import UserInRoomActive from './UserInRoomActive';
import FlipMove from 'react-flip-move';

class Roster extends Component {

  render() {

    const playerItems = this.props.players.map(player => {

        if (player.clientId !== this.props.me) {
          return <FlipMove enterAnimation='fade' leaveAnimation='fade'>
          <UserInRoom key={player.name} player={player.name} score={player.score}/>
          </FlipMove>;
        } else {
          return <FlipMove enterAnimation='fade' leaveAnimation='fade'>
          <UserInRoomActive key={player.name} player={player.name} score={player.score}/>
        </FlipMove>;
      }
      });
    return (

      <main className="players">
        <h4>~ Scoreboard ~</h4>
        <ul className="list-group" id="roster">
          {playerItems}
        </ul>
      </main>

    );
  }
}

export default Roster;