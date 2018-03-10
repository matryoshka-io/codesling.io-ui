import React from 'react';
import PropTypes from 'prop-types';

import MessageBox from './MessageBox.jsx' // eslint-disable-line

const MessagingIndex = props => <MessageBox socket={props.socket} />;

MessagingIndex.propTypes = {
  socket: PropTypes.object.isRequired, // eslint-disable-line
};

export default MessagingIndex;
