import React from 'react';
import PropTypes from 'prop-types';

import MessageBox from './MessageBox.jsx' // eslint-disable-line

const MessagingIndex = props => (
  <div className="messaging">
    <MessageBox socket={props.socket} />
    <style>{`
    #text {
      width: 225px;
      height: 10px;
    }
    `}
    </style>
  </div>
);

MessagingIndex.propTypes = {
  socket: PropTypes.object.isRequired, // eslint-disable-line
};

export default MessagingIndex;
