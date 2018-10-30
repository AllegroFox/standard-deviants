import React, { Component } from 'react';

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
                  <div class="card">
                    <div class="card-body">
                      <div class="card-header">
                        word: {(this.props.leaderBoard[0].topScoringSynonyms[0].word) || "Still populating..."}
                        player: {(this.props.leaderBoard[0].topScoringSynonyms[0].handle) || "Still populating..."}
                        worth {(this.props.leaderBoard[0].topScoringSynonyms[0].pointValue) || "unknown"} points
                      </div>
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                        word: {(this.props.leaderBoard[0].topScoringSynonyms[1].word) || "Still populating..."}
                        player: {(this.props.leaderBoard[0].topScoringSynonyms[1].handle) || "Still populating..."}
                        worth {(this.props.leaderBoard[0].topScoringSynonyms[1].pointValue) || "unknown"} points
                        </li>
                        <li class="list-group-item">
                        word: {(this.props.leaderBoard[0].topScoringSynonyms[2].word) || "Still populating..."}
                        player: {(this.props.leaderBoard[0].topScoringSynonyms[2].handle) || "Still populating..."}
                        worth {(this.props.leaderBoard[0].topScoringSynonyms[2].pointValue) || "unknown"} points
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  Today, Synonyms
                  <div class="card">
                    <div class="card-body">
                      <div class="card-header">
                        word: {(this.props.leaderBoard[0].topScoringSynonyms[0].word) || "Still populating..."}
                        player: {(this.props.leaderBoard[0].topScoringSynonyms[0].handle) || "Still populating..."}
                        worth {(this.props.leaderBoard[0].topScoringSynonyms[0].pointValue) || "unknown"} points
                      </div>
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                          word: {(this.props.leaderBoard[0].topScoringSynonyms[1].word) || "Still populating..."}
                          player: {(this.props.leaderBoard[0].topScoringSynonyms[1].handle) || "Still populating..."}
                          worth {(this.props.leaderBoard[0].topScoringSynonyms[1].pointValue) || "unknown"} points
                        </li>
                        <li class="list-group-item">
                          word: {(this.props.leaderBoard[0].topScoringSynonyms[2].word) || "Still populating..."}
                          player: {(this.props.leaderBoard[0].topScoringSynonyms[2].handle) || "Still populating..."}
                          worth {(this.props.leaderBoard[0].topScoringSynonyms[2].pointValue) || "unknown"} points
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  All Time, Rhymes
                  <div class="card">
                    <div class="card-body">
                      <div class="card-header">
                        word: {(this.props.leaderBoard[0].topScoringSynonyms[0].word) || "Still populating..."}
                        player: {(this.props.leaderBoard[0].topScoringSynonyms[0].handle) || "Still populating..."}
                        worth {(this.props.leaderBoard[0].topScoringSynonyms[0].pointValue) || "unknown"} points
                      </div>
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                          word: {(this.props.leaderBoard[0].topScoringSynonyms[1].word) || "Still populating..."}
                          player: {(this.props.leaderBoard[0].topScoringSynonyms[1].handle) || "Still populating..."}
                          worth {(this.props.leaderBoard[0].topScoringSynonyms[1].pointValue) || "unknown"} points
                        </li>
                        <li class="list-group-item">
                          word: {(this.props.leaderBoard[0].topScoringSynonyms[2].word) || "Still populating..."}
                          player: {(this.props.leaderBoard[0].topScoringSynonyms[2].handle) || "Still populating..."}
                          worth {(this.props.leaderBoard[0].topScoringSynonyms[2].pointValue) || "unknown"} points
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  Today, Rhymes
                  <div class="card">
                    <div class="card-body">
                      <div class="card-header">
                        word: {(this.props.leaderBoard[0].topScoringSynonyms[0].word) || "Still populating..."}
                        player: {(this.props.leaderBoard[0].topScoringSynonyms[0].handle) || "Still populating..."}
                        worth {(this.props.leaderBoard[0].topScoringSynonyms[0].pointValue) || "unknown"} points
                      </div>
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                          word: {(this.props.leaderBoard[0].topScoringSynonyms[1].word) || "Still populating..."}
                          player: {(this.props.leaderBoard[0].topScoringSynonyms[1].handle) || "Still populating..."}
                          worth {(this.props.leaderBoard[0].topScoringSynonyms[1].pointValue) || "unknown"} points
                        </li>
                        <li class="list-group-item">
                          word: {(this.props.leaderBoard[0].topScoringSynonyms[2].word) || "Still populating..."}
                          player: {(this.props.leaderBoard[0].topScoringSynonyms[2].handle) || "Still populating..."}
                          worth {(this.props.leaderBoard[0].topScoringSynonyms[2].pointValue) || "unknown"} points
                        </li>
                      </ul>
                    </div>
                  </div>
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
