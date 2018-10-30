import React, { Component } from 'react';
import UserInRoom from './UserInRoom';
import UserInRoomActive from './UserInRoomActive';
import FlipMove from 'react-flip-move';

class Roster extends Component {

  render() {

    const playerItems = this.props.players.map(player => {

        if (player.clientId !== this.props.me) {
          return <UserInRoom key={player.clientId} player={player.name} score={player.score}/>
        } else {
          return <UserInRoomActive key={player.clientId} player={player.name} score={player.score}/>
      }
      });
    return (

      <main className="players">
        <h4>
          ~ Scoreboard ~
          <button type="button" className="stats-btn btn btn-primary" data-toggle="modal" data-target="#stats" style={{marginLeft: '37.8%'}}>
            Statistics!
          </button>
        </h4>
        <ul className="list-group" id="roster">
          <FlipMove
            enterAnimation='fade'
            leaveAnimation='fade'
            duration='400'
            delay='0'
            easing='ease'
            staggerDurationBy='15'
            staggerDelayBy='20'
          >
            {playerItems}
          </FlipMove>
        </ul>
      </main>

    );
  }
}

export default Roster;