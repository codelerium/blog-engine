import React from 'react';
import PropTypes from 'prop-types';
import s from './styles.css';

export const Title = props => (
  <h1 style={s.TITLE}>
    {props.text}
  </h1>
);

Title.propTypes = {
  text: PropTypes.string.isRequired,
};
