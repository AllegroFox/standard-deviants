import React, { Component } from 'react';
import ModalPrompt from './ModalPrompt';

class RulesModal extends Component {

  render() {

    return (

      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title" id="exampleModalLongTitle">New Round</h3>
        </div>
        <div class="modal-body">
          <h5>Here are your words for this round:</h5>
          <ModalPrompt prompt={this.props.prompt}/>
        </div>
      </div>

    );
  }
}

export default RulesModal;