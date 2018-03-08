import React, { Component } from 'react'
import io from 'socket.io-client/dist/socket.io.js';

class MessageBox extends Component {
  constructor() {
    super();
    this.state = {
      ownerMessage: 'HELLO FROM OWNER',
      challengerMessage: 'HELLO FROM CHALLENGER',
    }
  }

  componentDidMount() {
    console.log('this.props from msgbox', this.props)
    // const ({ socket }) = this.props;
    // socket.on('connect', () => {
    //   socket.emit('client.ready')
    // })
    const socket = this.props.socket.socket
    socket.on('connect', () => {
      socket.emit('client.ready')
    })
  }



  render() {
    console.log('this.props from msg', this.props)
    return (
      <div>
        {this.state.ownerMessage} <br />
        {this.state.challengerMessage}
      </div>
    )
  }
}

export default MessageBox;