import React from 'react';
import PropTypes from 'prop-types';
import s from './style.css';

export const Row = props => (
  <div style={{ ...s.ROW, ...props.style }}>
    {props.children}
  </div>
);

Row.defaultProps = {
  style: {},
};

Row.propTypes = {
  style: PropTypes.object,
};
