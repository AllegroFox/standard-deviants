import React, { Component } from 'react';

class InputBar extends Component {

  render() {
    return (

      <div className="game-input">
        <div className="form-group">
          <label for="gameInputForm">Try a Word!</label>
          <input type="text" className="form-control" id="gameInputForm" placeholder="Input a word"/>
        </div>
      </div>
    );
  }
}

export default InputBar;