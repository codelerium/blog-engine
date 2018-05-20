import React from 'react';
import PropTypes from 'prop-types';

export const Subtitle = props => (
    <h2>
        {props.text}
    </h2>
)

Subtitle.propTypes = {
    text: PropTypes.string.isRequired,
}
