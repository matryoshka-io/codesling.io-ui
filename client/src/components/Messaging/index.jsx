import React, { Component } from 'react'

import MessageBox from './MessageBox.jsx'

class MessagingIndex extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      // <div className="messaging">
        <MessageBox socket={this.props.socket} />
      // </di?v>
    )
  }
}

export default MessagingIndex;
