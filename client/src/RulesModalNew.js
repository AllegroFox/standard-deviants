import React, { Component } from 'react';
import ModalPrompt from './ModalPrompt';

class RulesModal extends Component {

  render() {

    if (this.props.gameState === "getReady") {
      return (

        <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" data-show="true" aria-labelledby="myLargeModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              ...
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