import React, { Component } from 'react'
import io from 'socket.io-client';

import ChatList from './ChatList.jsx'
import Button from '../globals/Button'

class MessageBox extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      message: '',
      allChats: [],
    }
  }

  componentDidMount() {
    // this.state.allChats.forEach(chat => {

    // })
  }

  // createUsername = () => {
  //   socket.emit('createUsername') //grab the username 
  // }

  sendMessage = (messageToSend) => {
    let socket = io('http://localhost:4155');
    const ownerEmail = localStorage.getItem('email');
    if (messageToSend && ownerEmail) {
      socket.emit('message', { message: messageToSend, user: ownerEmail })
    } else {
      alert('Please include a message.')
    }
    socket.on('newMessage', data => {
      console.log('data', data)
      this.state.allChats.push(data)
      console.log('this.state.allChats', this.state.allChats)
      // this.setState({ user: data.user, message: data.message })
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
          <div className="message-bar">
            <input id="text" type="text" onChange={this.onTextChangeHandler} />
            {/* <button id="chat-btn" type="button" onClick={this.buttonClickHandler}>Send</button> */}
            <Button
              backgroundColor="red"
              color="white"
              text="send"
              onClick={this.buttonClickHandler}
            />
          </div>
        </div>
        <style>{`
        #text {
          width: 225px;
          height: 10px;
          font-size: 12px;
          padding: 15px 0px 15px 8px;;
        }
        .messaging-box {
          position: fixed;
          bottom:0
        }
        .message-bar {
          display: flex;
        }
        #chat-btn {
          font-size: 12px;
          font-color: white;
          background-color:red;
        }
        `}</style>
      </div>
    )
  }
}

export default MessageBox;