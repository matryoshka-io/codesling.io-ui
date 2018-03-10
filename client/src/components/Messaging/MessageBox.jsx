import React, { Component } from 'react';
// import io from 'socket.io-client';

import Button from '../globals/Button';
import './MessageBox.css';

class MessageBox extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
      allChats: [],
    };
  }

  componentDidMount() {
    const { socket } = this.props; // eslint-disable-line
    socket.on('connect', () => {
      socket.on('server.newMessage', (newMessage) => {
        const dataArr = [newMessage];
        this.setState({
          allChats: this.state.allChats.concat(dataArr),
        });
      });
    });
  }

  onTextChangeHandler = (e) => {
    this.setState({ message: e.target.value });
  }

  buttonClickHandler = () => {
    this.sendMessage(this.state.message);
  }

  sendMessage = () => {
    const { socket } = this.props;
    const ownerEmail = localStorage.getItem('email');
    socket.emit('client.chat', { user: ownerEmail, messages: this.state.message });
  }

  render() {
    return (
      <div className="messaging-box">
        <div className="display-message">
          {this.state.allChats.map((chat, index) => (
            <div key={index} /* eslint-disable-line */ >
              {chat.user} {chat.messages}
            </div>
          ))}
          <div className="message-bar">
            <input id="text" type="text" onChange={e => this.onTextChangeHandler(e)} />
            { }
            <Button
              backgroundColor="red"
              color="white"
              text="send"
              onClick={this.buttonClickHandler}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MessageBox;
