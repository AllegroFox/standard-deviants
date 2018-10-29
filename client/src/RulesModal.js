import React, { Component } from 'react';
import ModalPrompt from './ModalPrompt';

class RulesModal extends Component {

  render() {

    if (this.props.gameState === "getReady") {
      return (
        <div className="modal-backdrop-custom">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title" id="exampleModalLongTitle">New Round : {this.props.prompt.gameModule}</h3>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-4">
                  <img className="prompt-img" src={require('./icons/veinseeker.png')}/>
                </div>
                <div className="col-md-8">
                  <h5>Here are your words for this round:</h5>
                  <ModalPrompt className="modal-prompt" prompt={this.props.prompt}/>
                  <ul>
                    <li>Rules: {this.props.prompt.rules}</li>
                    <li>Scoring: {this.props.prompt.scoring}</li>
                  </ul>
                </div>
              </div>
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