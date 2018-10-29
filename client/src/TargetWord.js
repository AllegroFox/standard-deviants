import React, { Component } from 'react';

class TargetWord extends Component {

  render() {
    return (

        <div className="prompt">
          <div class="card text-center text-white bg-info mb-3" style={{'width': '16rem', height: '8rem', margin: '1em'}}>
            <h3 className="card-title">{this.props.word}</h3>
            <div class="card-body">
              <p class="card-text">{this.props.hint}</p>
            </div>
          </div>
        </div>

    );
  }
}

export default TargetWord;





