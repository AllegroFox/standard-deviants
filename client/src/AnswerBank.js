import React, { Component } from 'react';
import Answer from './Answer'

class AnswerBank extends Component {

  render() {
    const  answerItems = this.props.answers.map(answer => (
      <Answer word={answer.id} status={answer.status} points={answer.pointValue}/>
      ));
    return (

      <main className="answers">
        <div className="answer">
          {answerItems}
        </div>
      </main>

    );
  }
}

export default AnswerBank;