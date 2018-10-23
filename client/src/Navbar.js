import React, { Component } from 'react';
import Marquee from './Marquee'

class NavBar extends Component {

  render() {
    return (

      <div>
        <nav className="navbar">
          <img src={require('./icons/connection.svg')} className="game-icon"/>
          <ul className="nav justify-content-center">
            <li className="nav-item">
              <Marquee/>
            </li>
          </ul>
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <span className="nav-link active">timer</span>
            </li>
            <li className="nav-item">
              <span className="nav-link"> - </span>
            </li>
            <li className="nav-item">
              <a href="/" className="navbar-brand">Syllynyms</a>
            </li>
            <li className="nav-item">
              <span className="nav-link disabled">
                <img src='https://api.adorable.io/avatars/60/bob@adorable.io.png' className="profile-img"/>
              </span>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default NavBar;