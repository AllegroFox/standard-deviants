import React, { Component } from 'react';
import Guess from './Guess'

class GuessBank extends Component {

  render() {
    const  guessItems = this.props.guesses.map(guess => (
      <Guess guess={guess.guess} status={guess.status}/>
      ));
    return (

      <main className="guesses">
        <div className="guess">
          {guessItems}
        </div>
      </main>

    );
  }
}

export default GuessBank;