import React, { Component } from 'react';

class UserNameForm extends Component {

  render() {

    const submissionOverride = event => {event.preventDefault()};

    return (
      <form className="dropdown-menu dropdown-menu-right p-4" aria-labelledby="userDropdownButton" onSubmit={submissionOverride}>
        <span className="dropdown-item">
          <div className="form-group">
            <label for="userNameInput">Enter a new handle:</label>
            <input type="text" className="form-control" id="userNameInput" value={this.props.inputValue} placeholder={this.props.username} onKeyUp={this.props.handleNameChange}/>
          </div>
        </span>
      </form>

    );
  }
}

export default UserNameForm;