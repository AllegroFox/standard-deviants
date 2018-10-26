import React, { Component } from 'react';
import AnswerBank from './AnswerBank';

class ScoreModal extends Component {

  render() {

    return (

      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">It's Over!</h5>
        </div>
        <div class="modal-body">
          <div class="row">
            <span>{this.props.finalResults.finalScoreboard[0].handle}: {this.props.finalResults.finalScoreboard[0].score}</span>
            <span>{this.props.finalResults.finalScoreboard[1].handle}: {this.props.finalResults.finalScoreboard[1].score}</span>
            <span>{this.props.finalResults.finalScoreboard[2].handle}: {this.props.finalResults.finalScoreboard[2].score}</span>
          </div>
          <div class="row">
            <div class="col-sm-6">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">{this.props.finalResults.AnswerBank[0].target}</h5>
                  <p class="card-text">{this.props.finalResults.AnswerBank[0].definition}</p>
                  <div className="answerContainer">
                    <AnswerBank answers={this.props.finalResults.AnswerBank[0].bank}/>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">{this.props.finalResults.AnswerBank[1].target}</h5>
                  <p class="card-text">{this.props.finalResults.AnswerBank[1].definition}</p>
                  <div className="answerContainer">
                    <AnswerBank answers={this.props.finalResults.AnswerBank[1].bank}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default ScoreModal;
