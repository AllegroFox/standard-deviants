import React, { Component } from 'react';
import TargetWord from './TargetWord';

class ModalPrompt extends Component {
  render() {
    const targetWords = this.props.prompt.objective.map(target => (
      <TargetWord word={target.word} hint={target.hint}/>
      ));
    return (
      <div>
        <div className="prompt-container d-inline-flex">
          {targetWords}
        </div>
      </div>

    );
  }
}

export default ModalPrompt;