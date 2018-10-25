import React, { Component } from 'react';
import UserInRoom from './UserInRoom';
import tinysort from 'tinysort'

class Roster extends Component {

  render() {
    const  playerItems = this.props.players.map(player => (
      <UserInRoom player={player.name} score={player.score}/>
      ));
    return (

      <main className="players">
        <ul onload={tinysort('ul#roster>li', {selector: 'badge', attr: 'value'})} className="list-group" id="roster">
          {playerItems}
        </ul>
      </main>

    );
  }
}

export default Roster;