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
                  <div className="card">
                    <div className="card-body">
                      <ul>
                        <li>
                          {conditionalContent(this.props.leaderBoard[0])}
                        </li>
                        <li>
                          {conditionalContent(this.props.leaderBoard[1])}
                        </li>
                        <li>
                          {conditionalContent(this.props.leaderBoard[2])}
                        </li>
                      </ul>
                    </div>
                  </div>

      )
  }


}

export default LeaderBoardCard;