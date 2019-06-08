import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const REPLACER = Object.freeze({
  LINK: { EXPR: /\(\(([^\)\)]*)\)\)/g, TPL: '<a target="_blank" href="$1">$1</a>' },
  ANCHOR: { EXPR: /\[([^\]]*)\]/g, TPL: '<a href="#$1">[$1]</a>' },
  BOLD: { EXPR: /\*([^\*]*)\*/g, TPL: '<strong>$1</strong>' },
  ITALIC: { EXPR: /_([^_]*)_/g, TPL: '<em>$1</em>' }
});

export const Paragraph = props => (
  <ParagraphWrapper>
    <StyledParagraph
      dangerouslySetInnerHTML={{ 
      __html: props.text
        .replace(REPLACER.LINK.EXPR, REPLACER.LINK.TPL)
        .replace(REPLACER.BOLD.EXPR, REPLACER.BOLD.TPL)
        .replace(REPLACER.ITALIC.EXPR, REPLACER.ITALIC.TPL)
        .replace(REPLACER.ANCHOR.EXPR, REPLACER.ANCHOR.TPL)
      }} 
    />
  </ParagraphWrapper>
);

Paragraph.propTypes = {
  text: PropTypes.string.isRequired,
};

const ParagraphWrapper = styled.div`
  padding: ${p => p.theme.spacing.sm} 0;
`;

const StyledParagraph = styled.p`
  padding: 0;
  margin: 0;
  font-size: 16px;
`;
