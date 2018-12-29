import React from 'react';
import PropTypes from 'prop-types';
import s from './styles.css';

const REPLACER = Object.freeze({
  LINK: { EXPR: /\(([^\)]*)\)/g, TPL: '<a target="_blank" href="$1">$1</a>' },
  ANCHOR: { EXPR: /\[([^\]]*)\]/g, TPL: '<a href="#$1">[$1]</a>' },
  BOLD: { EXPR: /\*([^\*]*)\*/g, TPL: '<strong>$1</strong>' },
  ITALIC: { EXPR: /_([^_]*)_/g, TPL: '<em>$1</em>' }
});

export const BlockQuote = props => (
  <blockquote 
    style={s.BLOCK_QUOTE}
    dangerouslySetInnerHTML={{
      __html: props.text.replace(REPLACER.ANCHOR.EXPR, REPLACER.ANCHOR.TPL)
    }}
  />
);

BlockQuote.propTypes = {
  text: PropTypes.string.isRequired,
};
