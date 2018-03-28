import React from 'react';
import PropTypes from 'prop-types';
import s from './styles.css';

export const Paragraph = props => (
  <div style={s.PARAGRAPH}>
    {
      props.title &&
        <h2>
          {props.title}
        </h2>
    }
    <p>
      {props.text}
    </p>
  </div>
);

Paragraph.defaultProps = {
  title: '',
};

Paragraph.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string.isRequired,
};
