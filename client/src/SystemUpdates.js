import React, { Component } from 'react';
import SysMessage from './SysMessage';

class SystemUpdates extends Component {

  render() {
    const  SysMessageItems = this.props.systemUpdates.map(message => (
      <SysMessage message={message} key={message.id} messageType={message.type}/>
      ));
    return (

      <main className="sysMessages">
        <div className="SysMessage">
          {SysMessageItems}
        </div>
      </main>

    );
  }
}

export default SystemUpdates;