import React, { Component } from 'react'

import MessageBox from './MessageBox.jsx'

class MessagingIndex extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
        <MessageBox socket={this.props.socket} />
    )
  }
}

export default MessagingIndex;
