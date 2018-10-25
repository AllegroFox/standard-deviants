import React, { Component } from 'react';

class UserNameForm extends Component {

  render() {
    return (

        <div className="form-group">
          <label for="userNameInput">Enter a new handle:</label>
          <input type="text" className="form-control" id="userNameInput" placeholder={this.props.username} onKeyUp={this.props.handleNameChange}/>
        </div>

    );
  }
}

export default UserNameForm;