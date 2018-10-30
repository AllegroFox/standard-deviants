import React, { Component } from 'react';
import LeaderBoardCard from './LeaderBoardCard.js';
class LeaderBoardModal extends Component {

  render() {

    return (
      <div className="modal fade" id="stats" tabindex="-1" role="dialog" aria-labelledby="stats" aria-hidden="true" backdrop="false">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle" style={{fontSize: '2em'}}>Leaderboard!</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div class="row">
                <div class="col-md-6 leaderboard">
                  Top-Scoring <em>Synonyms</em> of All Time
                  <LeaderBoardCard leaderBoard={this.props.leaderBoard[0].topScoringSynonyms}/>
                </div>
                <div class="col-md-6 leaderboard">
                  Today's Top-Scoring <em>Synonyms</em>
                  <LeaderBoardCard leaderBoard={this.props.leaderBoard[1].topScoringSynonyms}/>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 leaderboard">
                  Top-Scoring <em>Rhymes</em> of All Time
                  <LeaderBoardCard leaderBoard={this.props.leaderBoard[0].topScoringRhymes}/>
                </div>
                <div class="col-md-6 leaderboard">
                  Today's Top-Scoring <em>Rhymes</em>
                  <LeaderBoardCard leaderBoard={this.props.leaderBoard[1].topScoringRhymes}/>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LeaderBoardModal;
