import React from 'react';
import PropTypes from 'prop-types';
import s from './style.css';

export const BUTTON_TYPE = {
    PRIMARY: 'BUTTON_PRIMARY',
}

export const Button = props => (
    props.children ? (
        <span style={s[props.type] || s.BUTTON} onClick={props.onClick}>
            { props.children }
        </span>
    ) : (
        <button style={s[props.type] || s.BUTTON} onClick={props.onClick}>
            {props.title}
        </button>
    )
);

Button.propTypes = {
    title: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.array,
    type: PropTypes.string,
};
