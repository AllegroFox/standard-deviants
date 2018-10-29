import React, { Component } from 'react';
import AnswerBank from './AnswerBank';

class ScoreModal extends Component {

  render() {

    if (this.props.gameState === "getResults" && Object.keys(this.props.finalResults).length > 0 ) {

      return (

        <div className="modal-backdrop-custom">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">It's Over!</h5>
            </div>
            <div className="modal-body scrollable">
              <div className="row">
                <span className="player-score">{this.props.finalResults.finalScoreboard[0].handle}: {this.props.finalResults.finalScoreboard[0].score} </span>
                <span className="player-score">{this.props.finalResults.finalScoreboard[1].handle}: {this.props.finalResults.finalScoreboard[1].score} </span>
                <span className="player-score">{this.props.finalResults.finalScoreboard[2].handle}: {this.props.finalResults.finalScoreboard[2].score} </span>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="card" style={{color: 'white'}} >
                    <div className="card-body answer-card">
                      <h5 className="card-title">{this.props.finalResults.answerBank[0].target}</h5>
                      <p className="card-text">{this.props.finalResults.answerBank[0].definition}</p>
                      <div className="answerContainer">
                        <AnswerBank answers={this.props.finalResults.answerBank[0].bank}/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="card" style={{color: 'black'}} >
                    <div className="card-body answer-card">
                      <h5 className="card-title">{this.props.finalResults.answerBank[1].target}</h5>
                      <p className="card-text">{this.props.finalResults.answerBank[1].definition}</p>
                      <div className="answerContainer">
                        <AnswerBank answers={this.props.finalResults.answerBank[1].bank}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      );

    } else {
      return null;
    }
  }
}

export default ScoreModal;
