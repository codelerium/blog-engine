import React from 'react';
import s from './styles.css';
import PropTypes from 'prop-types';

export const PillarBox = props => (
  <div style={{ ...s.PILLAR_BOX, width: !props.extended ? '705px' : '825px' }}>
    {props.children}
  </div>
);

PillarBox.defaultProps = {
  extended: false,
};

PillarBox.propTypes = {
  extended: PropTypes.bool,
};

