import React, { Component } from 'react'
import io from 'socket.io-client';

class MessageBox extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      message: '',
    }
  }

  componentDidMount() {

  }

  createUsername = () => {
    socket.emit('createUsername') //grab the username 
  }

  sendMessage = (message) => {
    let socket = io('http://localhost:4155');
    const ownerEmail = localStorage.getItem('email');
    if (message && ownerEmail) {
      socket.emit('message', { message: message, user: ownerEmail })
    }
    socket.on('newMessage', data => {
      this.setState({
        user: data.user,
        message: data.message,
      })
    })
  }

  onTextChangeHandler = (e) => {
    this.setState({ message: e.target.value })
  }

  buttonClickHandler = () => {
    this.sendMessage(this.state.message)
  }

  render() {
    return (
      <div className="messaging-box">
        <div className="display-message">
          {this.state.user} {this.state.message}
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