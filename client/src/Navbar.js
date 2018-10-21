import React, { Component } from 'react';

class NavBar extends Component {

  render() {
    return (

      <div>
        <nav class="navbar">
          <a href="/" class="navbar-brand">Syllynyms</a>
          <ul class="nav justify-content-end">
            <li class="nav-item">
              <a class="nav-link active" href="#">Active</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#">Disabled</a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default NavBar;