import React, { Component } from 'react';
import io from 'socket.io-client/dist/socket.io';
import PropTypes from 'prop-types';

import Sling from './Sling.jsx'; // eslint-disable-line

const { REACT_APP_SOCKET_SERVER_URL } = process.env;

class SlingIndex extends Component {
  state = {
    socket: null,
  };

  componentWillMount() {
    this.socket = io(REACT_APP_SOCKET_SERVER_URL, {
      query: {
        roomId: this.props.location.pathname.slice(1),
      },
    });

    this.setState({ socket: this.socket });
  }

  render() {
    if (this.props.location.state) {
      return (
        <Sling socket={this.state.socket} challenge={this.props.location.state.challenge} />
      );
    }
    return (
      <Sling socket={this.state.socket} challenge={{}} />
    );
  }
}

SlingIndex.propTypes = {
  location: PropTypes.object.isRequired, // eslint-disable-line
};

export default SlingIndex;
