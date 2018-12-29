import React from 'react';
import PropTypes from 'prop-types';
import s from './style.css';

const REPLACER = Object.freeze({
    LINK: { 
        EXPR: /\(([^\)]*)\)/g, 
        TPL: id => `<a id="${id}" style="color: rgb(187, 187, 187); text-decoration: none; width: 100%; overflow: hidden; text-overflow: ellipsis" target="_blank" href="$1">$1</a>` 
    },
});

export const Reference = props => (
    <div style={s.REFERENCE_WRAPPER}>
        {
            props.references.map((reference, i) => (
                <div 
                    style={s.REFERENCE} 
                    key={i}
                    dangerouslySetInnerHTML={{ 
                        __html: `[${i + 1}] ${
                            reference.replace(
                                REPLACER.LINK.EXPR, 
                                REPLACER.LINK.TPL(i + 1, s.REFERENCE_ANCHOR)
                            )
                        }`
                    }}
                />
            ))
        }
    </div>
)

Reference.propTypes = {
    references: PropTypes.array.isRequired,
}
