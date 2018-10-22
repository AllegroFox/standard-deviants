import React, { Component } from 'react';

class NavBar extends Component {

  render() {
    return (

      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Syllynyms</a>
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <a className="nav-link active" href="#">Active</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#">Disabled</a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default NavBar;