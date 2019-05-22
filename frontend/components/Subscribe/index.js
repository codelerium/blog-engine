import React, { Component } from 'react';
import * as Guid from 'guid';
import { PillarBox } from '../PillarBox';
import { Input } from '../Input';
import { Button, BUTTON_TYPE } from '../Button';
import { API } from '../../endpoints';
import s from './style.less'
import Notification, { NOTIFICATION_TYPES } from '../Notification';

export default class Subscribe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            openNotification: false,
            subscribed: false,
            errMsg: '',
            successMsg: 'Your verification email was sent! ୧(◕‿◕)୨',
        }

        this.onEmailChange = this.onEmailChange.bind(this);
        this.onSubscribe = this.onSubscribe.bind(this);
        this.isEmailValid = this.isEmailValid.bind(this);
        this.onCloseNotification = this.onCloseNotification.bind(this);
    }

    isEmailValid(email) {
        return /[^@]@.+\..+/.test(email);
    }

    onCloseNotification() {
        this.setState({ openNotification: false })
    }

    onEmailChange(e) {
        this.setState({ email: e.target.value });
    }

    onSubscribe() {
        const { email } = this.state;
        const valid = this.isEmailValid(email);

        if (valid) {
            this.setState({ hasErr: false, errMsg: '' });
            API.SUBSCRIBE({ id: Guid.raw(), email })
                .then((res) => {
                    if (res.email) {
                        this.setState({ 
                            subscribed: true,
                            openNotification: true,
                        });
                    } else {
                        this.setState({ 
                            subscribed: false,
                            openNotification: true,
                            errMsg: 'You already subscribed with this email!',
                        });
                    }
                })
                .catch((err) => (console.log(err)));
        } else {
            this.setState({
                openNotification: true,
                errMsg: 'Invalid email format',
            });
        }
    }

    render() {
        const {
            email, openNotification, errMsg, subscribed, successMsg,
        } = this.state;

        return (
            <div className={s.subscribe}>
                <PillarBox>
                    <div className={s.subscribe_inner}>
                        <h2>Do not miss any update!</h2>
                        <div>Subscribe to the codelirium newsletter to stay tuned.</div>
                        <div className={s.subscribe_input}>
                            <Input 
                                onChange={this.onEmailChange}
                                value={email}
                                placeholder="Type your email"
                                type="email"
                            />
                        </div>
                        <Button
                            title="Subscribe"
                            type={BUTTON_TYPE.PRIMARY}
                            onClick={this.onSubscribe}
                        />
                    </div>
                </PillarBox>
                <Notification
                    open={openNotification}
                    text={subscribed ? successMsg : errMsg}
                    type={subscribed ? NOTIFICATION_TYPES.SUCCESS : NOTIFICATION_TYPES.DANGER}
                    onClose={this.onCloseNotification}
                />
            </div>
        )
    }
}