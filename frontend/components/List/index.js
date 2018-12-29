import React from 'react';
import PropTypes from 'prop-types';
import s from './styles.css';

export const List = props => (
  <div>
    <ul>
      {
        props.items.map((item, i) => (
          <li key={i} style={s.LI}>{ item }</li>
        ))
      }
    </ul>
  </div>
);

List.propTypes = {
  items: PropTypes.array.isRequired,
};
