import React, { Component } from 'react';

class InputBar extends Component {

  handleBlur() {
    this.placeholder = this.props.placeholder;
  }

  handleFocus() {
    this.placeholder = "";
  }

  render() {

    return (

      <div className="game-input">
        <div className="form-group">
          <input type="text" className="form-control" id="gameInputForm" placeholder={this.props.placeholder} onFocus={this.handleBlur.bind(this)} onBlur={this.handleBlur.bind(this)} value={this.props.value} style={this.props.backgroundColor} onChange={this.props.handleChange} onKeyUp={this.props.handleSubmit}/>
        </div>
      </div>
    );
  }
}

export default InputBar;