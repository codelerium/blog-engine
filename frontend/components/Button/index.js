import React from 'react';
import PropTypes from 'prop-types';
import { LoginButton } from 'react-facebook';
import s from './style.less';

export const BUTTON_TYPE = {
    PRIMARY: 'BUTTON_PRIMARY',
    LOGIN: 'LOGIN',
}

export const Button = props => (
    props.children ? (
        <span className={s.button} onClick={props.onClick}>
            { props.children }
        </span>
    ) : (
        props.type === BUTTON_TYPE.LOGIN ? (
            <div className={s.button}>
                <LoginButton
                    scope="email"
                    onCompleted={props.onClick}
                    onError={props.onClick}
                    className="login-button"
                >
                    {props.title}
                </LoginButton>
            </div>
        ) : (
            <button className={s.button} onClick={props.onClick}>
                {props.title}
            </button>
        )
    )
);

Button.propTypes = {
    title: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.array,
    type: PropTypes.string,
};
