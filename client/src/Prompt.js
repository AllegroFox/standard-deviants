import React, { Component } from 'react';

class Prompt extends Component {
  render() {
    return (

      <div>
        <div className="prompt">Synonyms for Awesome</div>
        <button type="button" className="btn btn-secondary" data-toggle="tooltip" data-placement="right" title="Here are some rules.">
          What do I need to do?
        </button>
      </div>

    );
  }
}

export default Prompt;