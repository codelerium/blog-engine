import React from 'react';
import s from './style.less';
import PropTypes from 'prop-types';

export const TextArea = props => (
  <textarea
    className={s.textarea}
    placeholder="What is in your mind?"
    onChange={props.onChange}
    value={props.value}
  />
);

TextArea.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};