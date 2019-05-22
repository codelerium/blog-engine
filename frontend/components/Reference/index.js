import React from 'react';
import PropTypes from 'prop-types';
import s from './style.less';

const REPLACER = Object.freeze({
    LINK: { 
        EXPR: /\(([^\)]*)\)/g, 
        TPL: id => `<a id="${id}" target="_blank" href="$1">[${id}] - $1</a>` 
    },
});

export const Reference = props => (
    <div className={s.reference__wrapper}>
        {
            props.references.map((reference, i) => (
                <div 
                    className={s.reference} 
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
    </div>
)

Reference.propTypes = {
    references: PropTypes.array.isRequired,
}
