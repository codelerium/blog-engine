import React from 'react';
import PropTypes from 'prop-types';

export const Input = props => (
  <input
    placeholder="Article name"
    onChange={props.onChange}
    value={props.value}
  />
);

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};