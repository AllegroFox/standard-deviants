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
                        Featured
                      </div>
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item">Cras justo odio</li>
                        <li class="list-group-item">Dapibus ac facilisis in</li>
                        <li class="list-group-item">Vestibulum at eros</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  Today, Synonyms
                  <div class="card">
                    <div class="card-body">
                      <div class="card-header">
                        Featured
                      </div>
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item">Cras justo odio</li>
                        <li class="list-group-item">Dapibus ac facilisis in</li>
                        <li class="list-group-item">Vestibulum at eros</li>
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
                        Featured
                      </div>
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item">Cras justo odio</li>
                        <li class="list-group-item">Dapibus ac facilisis in</li>
                        <li class="list-group-item">Vestibulum at eros</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  Today, Rhymes
                  <div class="card">
                    <div class="card-body">
                      <div class="card-header">
                        Featured
                      </div>
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item">Cras justo odio</li>
                        <li class="list-group-item">Dapibus ac facilisis in</li>
                        <li class="list-group-item">Vestibulum at eros</li>
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
