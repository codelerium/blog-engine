import React from 'react';
import PropTypes from 'prop-types';
import s from './styles.css';

const REPLACER = Object.freeze({
  LINK: { EXPR: /\(\(([^\)\)]*)\)\)/g, TPL: '<a target="_blank" href="$1">$1</a>' },
  ANCHOR: { EXPR: /\[([^\]]*)\]/g, TPL: '<a href="#$1">[$1]</a>' },
  BOLD: { EXPR: /\*([^\*]*)\*/g, TPL: '<strong>$1</strong>' },
  ITALIC: { EXPR: /_([^_]*)_/g, TPL: '<em>$1</em>' }
});

export const Paragraph = props => (
  <div style={s.PARAGRAPH_WRAPPER}>
    <p 
      style={s.PARAGRAPH} 
      dangerouslySetInnerHTML={{ 
        __html: props.text
          .replace(REPLACER.LINK.EXPR, REPLACER.LINK.TPL)
          .replace(REPLACER.BOLD.EXPR, REPLACER.BOLD.TPL)
          .replace(REPLACER.ITALIC.EXPR, REPLACER.ITALIC.TPL)
          .replace(REPLACER.ANCHOR.EXPR, REPLACER.ANCHOR.TPL)
      }} 
    />
  </div>
);

Paragraph.propTypes = {
  text: PropTypes.string.isRequired,
};
