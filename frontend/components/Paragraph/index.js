import React from 'react';
import PropTypes from 'prop-types';
import s from './styles.css';

export const Paragraph = props => (
  <div style={s.PARAGRAPH_WRAPPER}>
    <p style={s.PARAGRAPH}>
      {props.text}
    </p>
  </div>
);

Paragraph.propTypes = {
  text: PropTypes.string.isRequired,
};
