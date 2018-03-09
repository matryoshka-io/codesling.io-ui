import React, { Component } from 'react';
import MessageBox from './MessageBox.jsx';

class ChatIndex extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="messaging">
        <div className="messageBox">
          <MessageBox socket={this.props.socket} />
        </div>
        <style>{`
        #text {
          width: 225px;
          height: 10px;
        }
        `}</style>
      </div>
    )
  }
}

export default ChatIndex;