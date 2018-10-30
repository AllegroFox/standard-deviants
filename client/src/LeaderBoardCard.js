import React, { Component } from 'react';

class LeaderBoardCard extends Component {

  render () {

    function conditionalContent(record) {
      if (record) {
        return <p>"{record.word}" by {record.handle} for {record.pointValue} points.</p>
      } else {
        return <p>Record unavailable...</p>;
      }
    }

    return (
                  <div className="card leaderboard-card">
                    <div className="card-body">
                      <ul className="list-unstyled">
                        <li>
                          <span className="badge badge-info first-place">
                            {conditionalContent(this.props.leaderBoard[0])}
                          </span>
                        </li>
                        <li>
                          <span className="badge badge-info second-place">
                            {conditionalContent(this.props.leaderBoard[1])}
                          </span>
                        </li>
                        <li>
                          <span className="badge badge-info third-place">
                            {conditionalContent(this.props.leaderBoard[2])}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

      )
  }


}

export default LeaderBoardCard;