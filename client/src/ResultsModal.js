import React, { Component } from 'react';
import AnswerBank from './AnswerBank';
import ModalClock from './ModalClock';

// Import modules for the Tim Johns Confetti Period
import Confetti from 'react-confetti';


class ResultsModal extends Component {


  render() {

    console.log("The Fated Object:");
    console.log(this.props.finalResults.finalScoreboard);

    // Checks to see if anyone scored this round, and prints an appropriate banner.
    const displayWinnerText = () => {
      if (this.props.finalResults.finalScoreboard[0].score) {
      return ( <div className="row">
                  <h1 className="prompt-banner">{this.props.finalResults.finalScoreboard[0].handle} won the round with {this.props.finalResults.finalScoreboard[0].score} points!</h1>
                </div> )
    } else {
      return (
        <div className="row">
          <h1 className="prompt-banner">No one scored this round.  Too difficult...?</h1>
        </div>
        );
      }
    }

    if (this.props.gameState === "getResults" && Object.keys(this.props.finalResults).length > 0 && this.props.finalResults.finalScoreboard[0]) {

      return (

        <div class="fade show modal-custom" tabindex="-1" role="dialog" data-show="true" aria-labelledby="myLargeModalLabel" aria-hidden="true">

          <Confetti
            width="1500%"
            height="900%"
            numberOfPieces={this.props.confettiQuantity}
            recycle={false}
          />


          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div className="modal-header">
                <h3 className="modal-title">It's Over!</h3>
                <ModalClock time={this.props.timeLeft} position="modal"/>
              </div>
              <div className="modal-body">
                {displayWinnerText()}
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
        </div>
      );
    } else {
      return null;
    }
  }
}

export default ResultsModal;
