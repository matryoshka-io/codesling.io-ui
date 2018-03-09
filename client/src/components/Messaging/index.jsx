import React, { Component } from 'react';
import MessageBox from './MessageBox.jsx';

class ChatIndex extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="messaging">
<<<<<<< HEAD
        <MessageBox socket={this.props.socket} />
=======
        <div className="messageBox">
          <MessageBox socket={this.props.socket} />
        </div>
>>>>>>> [msg] live update chat working properly now
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

<<<<<<< HEAD
export default ChatIndex;
=======
export default ChatIndex;
>>>>>>> [msg] live update chat working properly now
