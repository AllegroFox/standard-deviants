import React, { Component } from 'react';

class Prompt extends Component {
  render() {
    return (

      <div>
        <div className="prompt">Synonyms for Awesome</div>
        <button type="button" className="btn btn-secondary" data-toggle="popover" data-placement="right" data-content="Here are some rules.">
          What am I doing again?
        </button>
      </div>

    );
  }
}

export default Prompt;