import React, { Component } from 'react';
import TargetWord from './TargetWord';

class Prompt extends Component {
  render() {
    const targetWords = this.props.prompt.objective.map(target => (
      <TargetWord word={target.word} hint={target.hint}/>
      ));
    return (
      <div>
        <div className="prompt-container d-inline-flex">
          {targetWords}
        </div>
        <div className="modal fade" id="RulesReminder" tabindex="-1" role="dialog" aria-labelledby="RulesReminder" aria-hidden="true" focus="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalCenterTitle">What am I doing again?</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <img id="rulesReminderImg" src={require('./icons/' + this.props.gameModule + '.png')}/>
                <h4>{this.props.prompt.rules}</h4>
                <h5>{this.props.prompt.scoring}</h5>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Prompt;