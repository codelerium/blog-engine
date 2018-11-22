import React from 'react';
import PropTypes from 'prop-types';
import s from './style.css';

export const Button = props => (
    props.children ? (
        <span style={s.BUTTON}>
            { props.children }
        </span>
    ) : (
        <button style={s.BUTTON} onClick={props.onClick}>
            {props.title}
        </button>
    )
);

Button.propTypes = {
    title: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.array,
};
