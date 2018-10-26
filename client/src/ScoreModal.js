import React, { Component } from 'react';

class ScoreModal extends Component {

  render() {

    return (

      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          Modal Content
        </div>
      </div>

    );
  }
}

export default ScoreModal;
