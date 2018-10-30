import React, { Component } from 'react';

class UserNameForm extends Component {

  render() {

    const submissionOverride = event => {event.preventDefault()};

    return (

      <div className="modal fade" id="newUsernameForm" tabindex="-1" role="dialog" aria-labelledby="newUsernameForm" aria-hidden="true" focus="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">Enter a new handle:</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={submissionOverride}>
                <div className="form-group">
                  <label for="userNameInput">What should we call you?</label>
                  <input type="text" className="form-control" id="userNameInput" value={this.props.inputValue} placeholder={this.props.username} onKeyUp={this.props.handleNameChange}/>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default UserNameForm;
