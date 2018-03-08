import React, { Component } from 'react'
import io from 'socket.io-client';

class MessageBox extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
    }
  }

  componentDidMount() {

  }

  createUsername = () => {
    socket.emit('createUsername') //grab the username 
  }

  sendMessage = (message) => {
    // console.log('this.props', this.props)
    // const message = this.state.message;
    // console.log()
    let socket = io('http://localhost:4155');
    socket.emit('click')
    console.log('message', message)
    const ownerEmail = localStorage.getItem('email');
    if (message && ownerEmail) {
      socket.emit('message', { message: message, user: ownerEmail })
    }
  }

  onTextChangeHandler = (e) => {
    this.setState({ message: e.target.value })
  }

  buttonClickHandler = () => {
    console.log('did i make it')
    this.sendMessage(this.state.message)
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