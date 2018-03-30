import React from 'react';
import s from './style.css';

export const Col = props => (
  <div style={s.COL}>
    {props.children}
  </div>
);
