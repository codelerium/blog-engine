import React from 'react';
import PropTypes from 'prop-types';
import s from './styles.less';

export const Date = props => (
  <div className={s.date}>
    {props.text}
  </div>
);

Date.propTypes = {
  text: PropTypes.string.isRequired,
};
