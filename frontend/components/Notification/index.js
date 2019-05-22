import React from 'react';
import PropTypes from 'prop-types';
import s from './style.less';

export const NOTIFICATION_TYPES = {
    WARNING: 'WARNING',
    DANGER: 'DANGER',
    SUCCESS: 'SUCCESS',
}

const CLASS_BY_TYPE = {
    [NOTIFICATION_TYPES.WARNING]: s.warning,
    [NOTIFICATION_TYPES.DANGER]: s.danger,
    [NOTIFICATION_TYPES.SUCCESS]: s.success,
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
            <div className={
                [
                    s.notification,
                    (open ? s.open : ''),
                    CLASS_BY_TYPE[type]
                ].join(' ')
            }>
                {text}
                <div
                    className={s.close}
                    onClick={this.onClose}
                />
            </div>
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