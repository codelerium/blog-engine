import React, { Component } from 'react';
import * as Guid from 'guid';
import Console from '../Console';
import { PillarBox } from '../PillarBox';
import { Input } from '../Input';
import { Button, BUTTON_TYPE } from '../Button';
import { API } from '../../endpoints';
import s from './style.css'

export default class Subscribe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            console: false,
            success_messages: [
                'Successfully subscribed! ୧(◕‿◕)୨',
                'Type "exit" to quit console',
            ],
        }

        this.onEmailChange = this.onEmailChange.bind(this);
        this.onSubscribe = this.onSubscribe.bind(this);
        this.onConsoleClose = this.onConsoleClose.bind(this);
    }

    onEmailChange(e) {
        this.setState({ email: e.target.value });
    }

    onSubscribe() {
        const { email } = this.state;
        API.SUBSCRIBE({ id: Guid.raw(), email })
            .then((res) => {
                this.setState({ 
                    subscribed: false,
                    console: true,
                });
            })
            .catch((err) => (console.log(err)));
    }

    onConsoleClose() {
        this.setState({ console: false });
    }

    render() {
        const { email, console, success_messages } = this.state;
        return (
            <div style={s.SUBSCRIBE}>
                <PillarBox>
                    <h2>Do not miss any update!</h2>
                    <div>Subscribe to the codelirium newsletter to stay tuned.</div>
                    <div style={s.INPUT}>
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
                </PillarBox>
                {
                    console && (
                        <Console
                            messages={success_messages}
                            open={console}
                            onClose={this.onConsoleClose}
                        />
                    )
                }
            </div>
        )
    }
}