import React from 'react';
import PropTypes from 'prop-types';
import s from './style.css';

export const Reference = props => (
    <div style={s.REFERENCE_WRAPPER}>
        {
            props.references.map((reference, i) => (
                <div style={s.REFERENCE} key={i}>
                    <a style={s.REFERENCE_ANCHOR} href='#'>
                        {`[${i + 1}] `}{reference}
                    </a>
                </div>
            ))
        }
    </div>
)

Reference.propTypes = {
    references: PropTypes.array.isRequired,
}
