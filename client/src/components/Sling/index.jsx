import React, { Component } from 'react';
import io from 'socket.io-client/dist/socket.io';
import PropTypes from 'prop-types';

import Sling from './Sling.jsx'; // eslint-disable-line

class SlingIndex extends Component {
  state = {
    socket: null,
  };

  componentWillMount() {
    this.socket = io('http://localhost:4155', {
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
