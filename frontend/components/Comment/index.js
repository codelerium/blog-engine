import React from 'react';
import PropTypes from 'prop-types';

export const Comment = props => (
  <div style={{ padding: '20px 0' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img style={{ borderRadius: '50%', height: 40, width: 40 }} src={'http://localhost:8080/images/thumbnail.jpeg'}/>
      <div style={{ fontWeight: 700, marginLeft: 10 }}>{props.name}</div>
    </div>
    <p style={{ margin: '0 0 0 50px' }}>
      {props.text}
    </p>
  </div>
);

Comment.defaultProps = {
  name: 'Unknown fella',
};

Comment.propTypes = {
  text: PropTypes.string.isRequired,
  name: PropTypes.string,
};
