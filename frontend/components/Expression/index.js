import React from 'react';
import PropTypes from 'prop-types';
import s from './style.css';

export const Expression = props => (
  <div style={s.EXPRESSION}>
    {
      props.text.split('\n').length > 1 ? (
        <div>
          {
            props.text.split('\n').map((expr, i) => (
              <div key={i} style={s.EXPRESSION_LIST_ITEM}>
                <div dangerouslySetInnerHTML={{ __html: katex.renderToString(expr) }}/>
              </div>
            ))
          }
        </div>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: katex.renderToString(props.text) }} />
      )
    }
  </div>
);

Expression.propTypes = {
  text: PropTypes.string.isRequired,
};
