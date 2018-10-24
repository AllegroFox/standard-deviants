import React, { Component } from 'react';

class TargetWord extends Component {

  render() {
    return (

      <div>
        <div className="prompt">{this.props.word}: {this.props.hint}</div>
      </div>

    );
  }
}

export default TargetWord;