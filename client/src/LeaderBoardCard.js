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
                  <div class="card">
                    <div class="card-body">
                      <div class="card-header">
                        {conditionalContent(this.props.leaderBoard[0])}
                      </div>
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                        {conditionalContent(this.props.leaderBoard[1])}
                        </li>
                        <li class="list-group-item">
                        {conditionalContent(this.props.leaderBoard[2])}
                        </li>

                      </ul>
                    </div>
                  </div>

      )
  }


}

export default LeaderBoardCard;