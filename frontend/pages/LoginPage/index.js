import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Page } from "../Page";
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { FormItem } from '../../components/FormItem';
import { API } from '../../endpoints';
import styled from 'styled-components';

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
    return (
      <Page skipAuth header={false}>
        {
          redirect && <Redirect to={redirect}/>
        }
        <LoginWrapper>
          <LoginBox>
            <Logo to="/">
              <img src="/images/logo-01.svg" />
            </Logo>
            <FormItem>
              <Input label="Email" value={username} onChange={this.onUsernameChange} />
            </FormItem>
            <FormItem>
              <Input label="Password" value={password} onChange={this.onPasswordChange} type="password" />
            </FormItem>
            <FormItem>
              <Button title="Login" onClick={this.onSubmit} />
            </FormItem>
          </LoginBox>
        </LoginWrapper>
      </Page>
    );
  }
}

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: ${p => p.theme.spacing.sm};
  border-bottom: 1px solid ${p => p.theme.color['gray-10']};
  margin-bottom: ${p => p.theme.spacing.md};

  img {
    height: 40px;
    width: 40px;
  }
`;

const LoginWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  padding: 120px 0;
  box-sizing: border-box;
  overflow: hidden;
  justify-content: center;
`;

const LoginBox = styled.div`
  width: 400px;
  padding: ${p => p.theme.spacing.sm};
  box-sizing: border-box;
`;

export default LoginPage;