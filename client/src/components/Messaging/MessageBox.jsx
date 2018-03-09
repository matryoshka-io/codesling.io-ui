import React, { Component } from 'react'
import io from 'socket.io-client';
import { uniq } from 'lodash';

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
    let { socket } = this.props;
    console.log('this.props', this.props)
    socket.on('connect', () => {
      socket.on('newMessage', newMessage => {
        console.log('newMsg', [newMessage])
        let dataArr = [newMessage.messages]
        console.log('dataArr', dataArr)
        this.setState({
          allChats: this.state.allChats.concat(dataArr),
          user: newMessage.user,
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
                {this.state.user} {chat}
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