import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

export const NOTIFICATION_TYPES = {
    WARNING: 'WARNING',
    DANGER: 'DANGER',
    SUCCESS: 'SUCCESS',
}

export default class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.timeout = null;
        this.onClose = this.onClose.bind(this);
        this.onAutoClose = this.onAutoClose.bind(this);
    }

    onClose() {
        this.props.onClose();
    }

    onAutoClose() {
        if (this.props.open) {
            if (this.timeout !== null) {
                clearTimeout(this.timeout);
            }
            this.timeout = setTimeout(() => {
                this.onClose();
            }, 5000);
        }
    }

    render() {
        const { text, type, open } = this.props;

        this.onAutoClose();
   
        return (
            <StyledNotification open={open} type={type}>
                {text}
                <CloseButton onClick={this.onClose}/>
            </StyledNotification>
        );
    }
}

Notification.defaultProps = {
    open: false,
}

Notification.propTypes = {
    open: PropTypes.bool,
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
}

const StyledNotification = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100000;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    transition: transform .3s ease;
    transform: translateY(-80px);
    opacity: 0;

    ${props => props.open && css`
        transform: translateY(0);
        opacity: 1;
    `}

    ${p => {
        switch(p.type) {
            case NOTIFICATION_TYPES.SUCCESS:
                return css`
                    background: ${p => p.theme.color.green};
                    color: ${p => p.theme.color.black};
                `;
            case NOTIFICATION_TYPES.WARNING:
                return css`
                    background: ${p => p.theme.color.yellow};
                    color: ${p => p.theme.color.black};
                `;
            case NOTIFICATION_TYPES.DANGER:
                return css`
                    background: ${p => p.theme.color.red};
                    color: ${p => p.theme.color.white};
                `;
            defalt:
                return null;
        }
    }}
`;

const CloseButton = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 80px;
    height: 80px;
    cursor: pointer;

    :before,
    :after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 25%;
        height: 2px;
        background: currentColor;
        transform-origin: 50% 50%;
    }

    :before {
        transform: translate(-50%, -50%) rotate(45deg);
    }

    :after {
        transform: translate(-50%, -50%) rotate(-45deg);
    }
`;