import React from 'react';
import PropTypes from 'prop-types';
import s from './style.css';

export const Subtitle = props => (
    <h2 style={s.SUBTITLE}>
        {props.text}
    </h2>
);

Subtitle.propTypes = {
    text: PropTypes.string.isRequired,
};
