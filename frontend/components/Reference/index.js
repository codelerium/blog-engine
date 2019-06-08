import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const REPLACER = Object.freeze({
    LINK: { 
        EXPR: /\(([^\)]*)\)/g, 
        TPL: id => `<a id="${id}" target="_blank" href="$1">[${id}] - $1</a>` 
    },
});

export const Reference = props => (
    <ReferenceWrapper>
        {
            props.references.map((reference, i) => (
                <StyledReference
                    key={i}
                    dangerouslySetInnerHTML={{ 
                        __html: reference.replace(
                            REPLACER.LINK.EXPR, 
                            REPLACER.LINK.TPL(i + 1)
                        )
                    }}
                />
            ))
        }
    </ReferenceWrapper>
)

Reference.propTypes = {
    references: PropTypes.array.isRequired,
}

const ReferenceWrapper = styled.div`
    padding: 20px 0;
`;

const StyledReference = styled.div`
    margin-bottom: 10px;
    display: flex;
    width: 100%;
    overflow: hidden;
    white-space: pre-wrap;
  
    a {
        color: ${p => p.theme.color['gray-50']}; 
        text-decoration: none;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;
