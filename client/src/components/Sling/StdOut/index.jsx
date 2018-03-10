import React from 'react';
import PropTypes from 'prop-types';

// import Loading from '../../globals/Loading';

const StdOut = ({ text }) => (
  <div>
    {text.split('\n').map((singleLine, idx) => (
      <div key={`stdout-singleline-idx-${idx}`} /* eslint-disable-line */ ><i>{singleLine}</i></div>
    ))}
  </div>
);

StdOut.propTypes = {
  text: PropTypes.string.isRequired,
};

export default StdOut;
