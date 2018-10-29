import React, { Component } from 'react';
import ModalPrompt from './ModalPrompt';

class RulesModal extends Component {

  render() {

    if (this.props.gameState === "getReady") {
      return (
        <div className="modal-backdrop-custom">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title" id="exampleModalLongTitle">New Round</h3>
            </div>
            <div className="modal-body">
              <h5>Here are your words for this round:</h5>
              <ModalPrompt className="modal-prompt" prompt={this.props.prompt}/>
            </div>
          </div>
        </div>

      );
    } else {
      return null;
    }
  }
}

export default RulesModal;