import React from 'react';
import s from './styles.css';
import PropTypes from 'prop-types';

export const PillarBox = props => (
  <div style={{ 
    ...s.PILLAR_BOX, 
    maxWidth: !props.extended ? '700px' : '1425px',
    padding: window.innerWidth <= 768 ? 20 : 0,
  }}>
    {props.children}
  </div>
);

PillarBox.defaultProps = {
  extended: false,
};

PillarBox.propTypes = {
  extended: PropTypes.bool,
};

