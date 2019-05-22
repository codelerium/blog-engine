import React from 'react';
import PropTypes from 'prop-types';
import s from './style.css';

export const Col = props => (
  <div style={{ ...s.COL, flex: props.ratio }}>
    <div style={s.COL_INNER}>
      {props.children}
    </div>
  </div>
);

Col.defaultProps = {
  ratio: 1,
}

Col.propTypes = {
  ratio: PropTypes.number,
}