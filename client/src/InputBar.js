import React, { Component } from 'react';

class InputBar extends Component {

  render() {
    return (

      <div class="game-input">
        <div class="form-group">
          <label for="gameInputForm">Try a Word!</label>
          <input type="text" class="form-control" id="gameInputForm" placeholder="Input a word"/>
        </div>
      </div>
    );
  }
}

export default InputBar;