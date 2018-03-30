import React from 'react';
import PropTypes from 'prop-types';
import s from './styles.css';

export const BlockQuote = props => (
  <blockquote style={s.BLOCK_QUOTE}>
    {props.text}
  </blockquote>
);

BlockQuote.propTypes = {
  text: PropTypes.string.isRequired,
};
