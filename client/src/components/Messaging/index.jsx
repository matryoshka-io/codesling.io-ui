import React, { Component } from 'react'

import MessageBox from './MessageBox.jsx'

class Messaging extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log('props from index', this.props)
    return (
      <div className="messaging">
        <div className="messageBox">
          <MessageBox socket={this.props} />
        </div>
        <div className="text-bar">
          <div className="chatTextArea">
            <input id="text" type="text" onChange={this.onChangeHandler}></input>
          </div>
          <div className="chatbtn">
            <button type="button">Chat</button>
          </div>
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

export default Messaging;