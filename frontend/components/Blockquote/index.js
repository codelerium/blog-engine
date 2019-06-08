import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const REPLACER = Object.freeze({
  LINK: { EXPR: /\(([^\)]*)\)/g, TPL: '<a target="_blank" href="$1">$1</a>' },
  ANCHOR: { EXPR: /\[([^\]]*)\]/g, TPL: '<a href="#$1">[$1]</a>' },
  BOLD: { EXPR: /\*([^\*]*)\*/g, TPL: '<strong>$1</strong>' },
  ITALIC: { EXPR: /_([^_]*)_/g, TPL: '<em>$1</em>' }
});

export const BlockQuote = props => (
  <Wrapper 
    dangerouslySetInnerHTML={{
      __html: props.text.replace(REPLACER.ANCHOR.EXPR, REPLACER.ANCHOR.TPL)
    }}
  />
);

BlockQuote.propTypes = {
  text: PropTypes.string.isRequired,
};

const Wrapper = styled.div`
  font-size: 20px;
  padding: 20px 0 20px 50px;
  margin: 0;
  color: ${props => props.theme.color['gray-20']};
  font-weight: 100;

  a {
    color: ${props => props.theme.color['gray-20']};
  }
`; 
