import React from 'react';
import PropTypes from 'prop-types';
import s from './styles.css';

export const Date = props => (
  <div style={s.DATE}>
    {props.text}
  </div>
);

Date.propTypes = {
  text: PropTypes.string.isRequired,
};
