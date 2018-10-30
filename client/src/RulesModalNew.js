import React, { Component } from 'react';
import ModalPrompt from './ModalPrompt';

class RulesModal extends Component {

  render() {

    if (this.props.gameState === "getReady") {
      return (

        <div class="show fade in modal-custom" tabindex="-1" role="dialog" data-show="true" aria-labelledby="myLargeModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div className="modal-header">
                <h3 className="modal-title" id="exampleModalLongTitle">New Round : {this.props.prompt.gameModule}!</h3>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-4">
                    <img className="prompt-img" src={require('./icons/' + this.props.prompt.gameModule + '.png')}/>
                  </div>
                  <div className="rules-modal col-md-8">
                    <h1 className="prompt-banner">{this.props.prompt.promptBanner}</h1>
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
        </div>
      );
    } else {
      return null;
    }
  }
}

export default RulesModal;