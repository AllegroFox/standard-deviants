import React, { Component } from 'react';
import LeaderBoardCard from './LeaderBoardCard.js';
class LeaderBoardModal extends Component {

  render() {

    return (
      <div className="modal fade" id="stats" tabindex="-1" role="dialog" aria-labelledby="stats" aria-hidden="true" backdrop="false">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">Top Scores</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div class="row">
                <div class="col-md-6">
                  All Time, Synonyms
                  <LeaderBoardCard leaderBoard={this.props.leaderBoard[0].topScoringSynonyms}/>
                </div>
                <div class="col-md-6">
                  Today, Synonyms
                  <LeaderBoardCard leaderBoard={this.props.leaderBoard[1].topScoringSynonyms}/>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  All Time, Rhymes
                  <LeaderBoardCard leaderBoard={this.props.leaderBoard[0].topScoringRhymes}/>
                </div>
                <div class="col-md-6">
                  Today, Rhymes
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
