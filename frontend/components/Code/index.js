import React from 'react';
import PropTypes from 'prop-types';
import Highlight from 'react-highlight';
import s from './styles.css';

export const Code = props => (
  <div style={s.CODE_WRAPPER}>
    <Highlight innerHtml className="javascript" >
      {props.snippet}
    </Highlight>
  </div>
);

Code.propTypes = {
  snippet: PropTypes.string.isRequired,
};
