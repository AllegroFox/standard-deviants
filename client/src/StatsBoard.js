import React, { Component } from 'react';

class StatsBoard extends Component {

  render() {

    return (
      <div className="dropdown-menu dropdown-menu-right p-4" aria-labelledby="statsDropdownButton">
        <span className="dropdown-item">
          <ul class="dropdown-menu list-group">
            <li class="dropdown-item list-group-item active">Cras justo odio</li>
            <li class="dropdown-item list-group-item">Dapibus ac facilisis in</li>
            <li class="dropdown-item list-group-item">Morbi leo risus</li>
            <li class="dropdown-item list-group-item">Porta ac consectetur ac</li>
            <li class="dropdown-item list-group-item">Vestibulum at eros</li>
          </ul>
        </span>
      </div>

    );
  }
}

export default StatsBoard;