import React, { Component } from 'react';
import TargetWord from './TargetWord';

class Prompt extends Component {
  render() {
    const targetWords = this.props.prompt.objective.map(target => (
      <TargetWord word={target.word} hint={target.hint}/>
      ));
    return (
      <div>
        <div className="prompt-container d-inline-flex">
          {targetWords}
        </div>
        <div class="collapse" id="collapseRules">
          <div class="card card-body prompt-rules">
            {this.props.prompt.rules}
          </div>
        </div>
      </div>

    );
  }
}

export default Prompt;