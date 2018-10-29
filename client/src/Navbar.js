import React, { Component } from 'react';
import Marquee from './Marquee';
import Clock from './Clock';
import UserNameForm from './UserNameForm';

class NavBar extends Component {

  render() {
    return (

      <div>
        <nav className="navbar">
          <img src={require('./icons/' + this.props.gameModule + '.png')} className="game-icon" alt="Vein Seeker"/>
          <div>
            <button type="button" className="btn btn-secondary" data-toggle="collapse" data-target="#collapseRules" style={{float: 'left'}}>
              <i class="fas fa-question-circle"></i>
            </button>
          </div>
          <ul className="nav justify-content-center">
            <li className="nav-item">
              <Marquee gameState={this.props.gameStateMessage}/>
              <Clock time={this.props.timeLeft}/>
            </li>
          </ul>
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <span className="nav-item">
                <img src={'https://api.adorable.io/avatars/60/' + this.props.handle + '.io.png'} className="profile-img" alt=""/>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#newUsernameForm">
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