import React from 'react';

// import Loading from '../../globals/Loading';

const StdOut = ({ text }) => {
  return (
    <div>
      {text.split('\n').map((singleLine, idx) => (
          <div key={`stdout-singleline-idx-${idx}`}><i>{singleLine}</i></div>
        ))}
    </div>
  );
};

export default StdOut;
