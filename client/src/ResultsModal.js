import React, { Component } from 'react';
import AnswerBank from './AnswerBank';

class ResultsModal extends Component {

  render() {

    if (this.props.gameState === "getResults" && Object.keys(this.props.finalResults).length > 0 && this.props.finalResults.finalScoreboard[0]) {

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

export default ResultsModal;
