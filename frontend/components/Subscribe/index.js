import React, { Component } from 'react';
import * as Guid from 'guid';
import { PillarBox } from '../PillarBox';
import { Input } from '../Input';
import { Button, BUTTON_TYPE } from '../Button';
import { API } from '../../endpoints';
import Notification, { NOTIFICATION_TYPES } from '../Notification';
import styled from 'styled-components';

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
            <SubscribeWrapper>
                <PillarBox>
                    <SubscribeInner>
                        <h2>Do not miss any update!</h2>
                        <div>Subscribe to the codelirium newsletter to stay tuned.</div>
                        <SubscribeInput>
                            <Input 
                                onChange={this.onEmailChange}
                                value={email}
                                placeholder="Type your email"
                                type="email"
                            />
                        </SubscribeInput>
                        <Button
                            title="Subscribe"
                            type={BUTTON_TYPE.PRIMARY}
                            onClick={this.onSubscribe}
                        />
                    </SubscribeInner>
                </PillarBox>
                <Notification
                    open={openNotification}
                    text={subscribed ? successMsg : errMsg}
                    type={subscribed ? NOTIFICATION_TYPES.SUCCESS : NOTIFICATION_TYPES.DANGER}
                    onClose={this.onCloseNotification}
                />
            </SubscribeWrapper>
        )
    }
}

const SubscribeWrapper = styled.div`
    border-top: 1px solid ${p => p.theme.color['gray-10']};
    padding: 160px 0;

    h2 {
        margin-bottom: ${p => p.theme.spacing.xs};
    }
`;

const SubscribeInner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SubscribeInput = styled.div`
    margin: ${p => p.theme.spacing.lg} 0 ${p => p.theme.spacing.sm};

    input {
        min-width: 500px;
        text-align: center;
    }
`;