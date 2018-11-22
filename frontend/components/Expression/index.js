import React from 'react';
import PropTypes from 'prop-types';
import { Tex } from 'react-tex';
import s from './style.css';

export const Expression = props => (
  <div style={s.EXPRESSION}>
    <Tex texContent={props.text}/>
  </div>
);

Expression.propTypes = {
  text: PropTypes.string.isRequired,
};
