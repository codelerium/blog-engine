import React from 'react';
import PropTypes from 'prop-types';
import s from './styles.css';
import { Date } from '../Date';

export const Title = props => (
  <div style={s.CONTAINER}>
    <h1 style={s.TITLE}>
      {props.text}
    </h1>
    <Date text={props.created}/>
  </div>
);

Title.propTypes = {
  text: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
};
