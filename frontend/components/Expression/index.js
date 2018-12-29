import React from 'react';
import PropTypes from 'prop-types';
import { Tex } from 'react-tex';
import s from './style.css';

export const Expression = props => (
  <div style={s.EXPRESSION}>
    {
      props.text.split('\n').length > 1 ? (
        <div>
          {
            props.text.split('\n').map((expr, i) => (
              <div key={i} style={s.EXPRESSION_LIST_ITEM}>
                <Tex texContent={expr}/>
              </div>
            ))
          }
        </div>
      ) : (
        <Tex texContent={props.text}/>
      )
    }
  </div>
);

Expression.propTypes = {
  text: PropTypes.string.isRequired,
};
