import React, { Component } from 'react';
import io from 'socket.io-client/dist/socket.io.js';

import Sling from './Sling.jsx';

const { REACT_SOCKET_SERVER_URL } = process.env;

class SlingIndex extends Component {
  state = {
    socket: null,
   }

  componentWillMount() {
    this.socket = io(REACT_SOCKET_SERVER_URL, {
      query: {
        roomId: this.props.location.pathname.slice(1)
      }
    });

    this.setState({ socket: this.socket });
  }

  render() {
    if (this.props.location.state) {
      return (
        <Sling socket={this.state.socket} challenge={this.props.location.state.challenge}/>
      );
    } else {
      return (
        <Sling socket={this.state.socket} challenge={{}}/>
      );
    }
  }
}

export default SlingIndex;