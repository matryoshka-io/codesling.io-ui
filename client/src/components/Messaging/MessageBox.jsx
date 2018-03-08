import React, { Component } from 'react'
import io from 'socket.io-client/dist/socket.io.js';;

class MessageBox extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
    }

  }

  componentDidMount() {
    const socket = io();

  }

  createUsername = () => {
    socket.emit('createUsername') //grab the username 
  }

  sendMessage = () => {
    console.log('this.props', this.props)
    const message = this.state.message;
    const ownerEmail = localStorage.getItem('email');
    if (message && ownerEmail) {
      socket.emit('message', { message, user: ownerEmail })
    }
  }

  onTextChangeHandler = (e) => {
    this.setState({ message: e.target.value })
  }

  buttonClickHandler = () => {

  }

  render() {
    return (
      <div className="messaging-box">
        <div className="display-message">
          <div className="message-bar">
            <input id="text" type="text" onChange={this.onTextChangeHandler} />
            <div id="chat-btn">
              <button type="button" onClick={this.buttonClickHandler}>Click</button>
            </div>
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

export default MessageBox;