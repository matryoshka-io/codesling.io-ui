import React, { Component } from 'react'
import io from 'socket.io-client';
import { uniq } from 'lodash';

import Button from '../globals/Button'

class MessageBox extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
      allChats: [],
    }
  }

  componentDidMount() {
    let { socket } = this.props;
    socket.on('connect', () => {
      socket.on('newMessage', newMessage => {
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
    socket.emit('message', { user: ownerEmail, messages: this.state.message })
  }

  onTextChangeHandler = (e) => {
    this.setState({ message: e.target.value })
  }

  buttonClickHandler = () => {
    this.sendMessage(this.state.message)
  }

  render() {
    console.log('this.state.allChats', this.state.allChats)
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
        <style>{`
        #text {
          width: 225px;
          height: 10px;
          font-size: 12px;
          padding: 15px 0px 15px 8px;;
        }
        .messageBox {
          border-style: solid;
          border-color: green;
        }
        .messaging {
          border-style: solid;
          border-color: pink;
        }
        .messaging-box {
          position: fixed;
          bottom: 0px;
          border-style: solid;
          border-color: blue;
        }
        .display-message {
          border-style: solid;
          border-color: red;
          max-height: 250px;
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