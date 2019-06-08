import React from 'react';
import PropTypes from 'prop-types';
import { LoginButton } from 'react-facebook';
import { css } from 'styled-components';

export const BUTTON_TYPE = {
    PRIMARY: 'BUTTON_PRIMARY',
    LOGIN: 'LOGIN',
}

export const Button = props => (
    props.children ? (
        <span css={buttonClass} onClick={props.onClick}>
            { props.children }
        </span>
    ) : (
        props.type === BUTTON_TYPE.LOGIN ? (
            <div css={buttonClass}>
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
            <button css={buttonClass} onClick={props.onClick}>
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

const buttonClass = css`
    font-size: 14px;
    padding: 0 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    border: 2px solid ${props => props.theme.color.black};
    color: ${props => props.theme.color.black};
    background: ${props => props.theme.color.white};
    outline: none;
    cursor: pointer;

    &:hover {
        color: ${props => props.theme.color.white};
        background: ${props => props.theme.color.black};

        button {
            color: ${props => props.theme.color.white};
            cursor: pointer;
        }
    }
`;