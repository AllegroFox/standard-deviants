import React, { Component } from 'react';

class Prompt extends Component {
  render() {
    return (

      <div>
        <div className="prompt">{this.props.prompt.objective}</div>
        <button type="button" className="btn btn-secondary" data-toggle="tooltip" data-placement="right" data-content= {this.props.prompt.rules}>
          What am I doing again?
          {this.props.prompt.rules}
        </button>
      </div>

    );
  }
}

export default Prompt;