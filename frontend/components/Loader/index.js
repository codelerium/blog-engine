import React from 'react';
import PropTypes from 'prop-types';
import s from './styles.css';
import { Date } from '../Date';

export const Loader = props => (
  <div style={s.CONTAINER}>
    <svg width="60px" height="60px" viewBox="-267 390.9 60 60" enableBackground="new -267 390.9 60 60">
      <path
        style={{ 
          animation: 'logoAnimation 3s ease-out infinite alternate'
        }}
        fill="none"
        stroke="#000" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeDasharray="0 200px 100px 5px"
        d="M-228.3,425.9c-1.7,3-5,5-8.7,5c-5.5,0-10-4.5-10-10s4.5-10,10-10c3.7,0,6.9,2,8.7,5h10.7c-2.2-8.6-10-15-19.3-15c-11,0-20,9-20,20s9,20,20,20c9.3,0,17.1-6.4,19.3-15H-228.3z"/>
    </svg>
  </div>
);
