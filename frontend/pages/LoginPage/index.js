import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Page } from "../Page";
import { PillarBox } from '../../components/PillarBox';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { API } from '../../endpoints';
import s from './style.css';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: '',
            redirect: null,
        };
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onUsernameChange(e) {
        this.setState({ username: e.target.value });
    }
    
    onPasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    onSubmit() {
        const { username, password } = this.state;
        API.LOGIN({ email: username, password })
            .then((res) => {
                if (res.success) {
                    localStorage.setItem('c_token', res.token);
                    this.setState({ redirect: '/admin' });
                } else {
                    this.setState({ redirect: '/login' });
                }
            });
    }

    render() {
        const { username, password, redirect } = this.state;
        console.log(redirect);
        return (
            <Page>
                <PillarBox>
                    <div style={s.FORM}>
                        <div style={s.FORM_ELEMENT}>
                            <Input value={username} onChange={this.onUsernameChange} />
                        </div>
                        <div style={s.FORM_ELEMENT}>
                            <Input value={password} onChange={this.onPasswordChange} type="password" />
                        </div>
                        <div style={s.FORM_ELEMENT}>
                            <Button title="Login" onClick={this.onSubmit} />
                        </div>
                    </div>
                    {
                        redirect && <Redirect to={redirect}/>
                    }
                </PillarBox>
            </Page>
        )
    }
}

export default LoginPage;