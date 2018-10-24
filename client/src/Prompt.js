import React, { Component } from 'react';
import TargetWord from './TargetWord';

class Prompt extends Component {
  render() {
    const targetWords = this.props.prompt.objective.map(target => (
      <TargetWord word={target.word} hint={target.hint}/>
      ));
    return (
      <div>
        <div className="prompt-container">
          {targetWords}
        </div>

        <button type="button" className="btn btn-secondary" data-toggle="collapse" data-target="#collapseRules">
          What am I doing again?
        </button>
        <div class="collapse" id="collapseRules">
          <div class="card card-body">
            {this.props.prompt.rules}
          </div>
        </div>
      </div>

    );
  }
}

export default Prompt;