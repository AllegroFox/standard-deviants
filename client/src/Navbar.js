import React, { Component } from 'react';
import Marquee from './Marquee';
import Clock from './Clock';
import UserNameForm from './UserNameForm';

class NavBar extends Component {

  render() {
    return (

      <div>
        <nav className="navbar">
          <img src={require('./icons/connection.svg')} className="game-icon"/>
          <ul className="nav justify-content-center">
            <li className="nav-item">
              <Marquee gameState={this.props.gameStateMessage}/>
            </li>
          </ul>
          <ul className="nav justify-content-end">
            <li className="align-middle">
              <span className="nav-item">
                <Clock time={this.props.timeLeft}/>
              </span>
            </li>
            <li className="nav-item">
              <span className="nav-item">
                <img src={'https://api.adorable.io/avatars/60/' + this.props.handle + '.io.png'} className="profile-img"/>
                <div className="dropdown">
                  <button className="btn btn-info dropdown-toggle" type="button" id="userDropdownButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.props.handle}
                  </button>

                  <UserNameForm username={this.props.handle} handleNameChange={this.props.handleNameChange} inputValue={this.props.handleBarContent}/>
                </div>
              </span>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default NavBar;