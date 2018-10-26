import React, { Component } from 'react';

class NewPlayerModal extends Component {

  render() {

    const submissionOverride = event => {event.preventDefault()};

    return (

      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Welcome to the Platform for Infinite Generativity!</h5>
        </div>
        <div class="modal-body">
          <form className="form-group" onSubmit={submissionOverride}>
            <label for="userNameInput">What should we call you?</label>
            <input type="text" className="form-control" id="userNameInput" placeholder="Enter your handle:" onKeyUp={this.props.handleNameChange}/>
          </form>
        </div>
      </div>

    );
  }
}

export default NewPlayerModal;
