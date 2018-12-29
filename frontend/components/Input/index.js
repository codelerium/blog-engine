import React from 'react';
import PropTypes from 'prop-types';
import s from './style.css';

export const Input = props => (
  <input style={s.INPUT}
    placeholder={props.placeholder}
    onChange={props.onChange}
    value={props.value}
    type={props.type || 'text'}
  />
);

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};
