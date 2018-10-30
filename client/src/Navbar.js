import React, { Component } from 'react';
import Marquee from './Marquee';
import Clock from './Clock';
import UserNameForm from './UserNameForm';

class NavBar extends Component {

  render() {
    return (

      <div>
        <nav className="navbar">
          <div className="d-flex justify-content-start">
            <ul className="navbar-title">
              <li>The Platform</li>
              <li>for Hosting</li>
              <li>Infinite Generativity</li>
            </ul>
          </div>
          <div className="nav justify-content-center">
            <img src={require('./icons/' + this.props.gameModule + '.png')} className="game-icon" alt="Vein Seeker"/>
            <span className="navbar-text">
              <Marquee gameState={this.props.gameStateMessage}/>
            </span>
            <span className="navbar-text">
              <Clock time={this.props.timeLeft}/>
            </span>
          </div>
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <span className="nav-item">
                <img src={'https://api.adorable.io/avatars/60/' + this.props.handle + '.io.png'} className="profile-img" alt=""/>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#newUsernameForm">
                  {this.props.handle}
                </button>
                <UserNameForm username={this.props.handle} handleNameChange={this.props.handleNameChange} inputValue={this.props.handleBarContent}/>
              </span>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default NavBar;