import React, { Component } from 'react'
import io from 'socket.io-client';

import Button from '../globals/Button';
import './MessageBox.css';

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
    let { socket } = this.props;
    socket.on('connect', () => {
      socket.on('server.newMessage', newMessage => {
        let dataArr = [newMessage]
        this.setState({
          allChats: this.state.allChats.concat(dataArr),
        })
      })
    });
  }

  sendMessage = (messageToSend) => {
    let { socket } = this.props;
    const ownerEmail = localStorage.getItem('email');
    socket.emit('client.chat', { user: ownerEmail, messages: this.state.message })
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
          {this.state.allChats.map((chat, index) => {
            return (
              <div>
                {chat.user} {chat.messages}
              </div>
            )
          })}
          <div className="message-bar">
            <input id="text" type="text" onChange={e => this.onTextChangeHandler(e)} />
            <Button
              backgroundColor="red"
              color="white"
              text="send"
              onClick={this.buttonClickHandler}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default MessageBox;