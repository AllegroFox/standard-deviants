import React, { Component } from 'react';

class InputBar extends Component {

  render() {

    return (

      <div className="game-input">
        <div className="form-group">
          <input type="text" className="form-control" id="gameInputForm" placeholder="Input a word" value={this.props.value} style={this.props.backgroundColor} onChange={this.props.handleChange} onKeyUp={this.props.handleSubmit}/>
        </div>
      </div>
    );
  }
}

export default InputBar;