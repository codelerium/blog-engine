import React from 'react';
import PropTypes from 'prop-types';
import s from './styles.css';

export const Paragraph = props => (
  <div style={s.PARAGRAPH}>
    <p>
      {props.text}
    </p>
  </div>
);

Paragraph.propTypes = {
  text: PropTypes.string.isRequired,
};
