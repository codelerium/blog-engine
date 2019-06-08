import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            closed: false,
            lastShouldClose: false,
        }
        this.lastScrollTop = 0;
        this.onScroll = this.onScroll.bind(this);
    }

    componentWillMount() {
        window.addEventListener('scroll', this.onScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }

    onScroll() {
        const current = window.pageYOffset;
        const { lastShouldClose } = this.state;
        const shouldClose = this.lastScrollTop < current;
        if (shouldClose) {
            if (lastShouldClose !== shouldClose) {
                this.setState({ closed: true, lastShouldClose: shouldClose });
            }
        } else {
            this.setState({ closed: false, lastShouldClose: shouldClose });
        }
        this.lastScrollTop = current;
    }

    render() {
        const { closed } = this.state;
        return (
            <Wrapper closed={closed}>
                <Logo to="/">
                    <img src="/images/logo-01.svg" />
                </Logo>
                <Menu>
                    <MenuItem to="/about">About</MenuItem>
                    <MenuItem to="/roadmap">Roadmap</MenuItem>
                    <MenuItem to="/contact">Contact</MenuItem>
                </Menu>
            </Wrapper>
        )
    }
}

const Logo = styled(Link)`
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    margin: 20px;

    img {
        width: 100%;
        height: 100%;
    }
`;

const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    height: 80px;
    justify-content: center;
    background: white;
    z-index: 1000;
    transform: translateY(0);
    transition: transform .3s ease;

    ${props => props.closed && css`
        transform: translateY(-80px);
    `}
`;

const Menu = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const MenuItem = styled(Link)`
    text-decoration: none;
    text-transform: uppercase;
    color: black;
    padding: 0 20px;
    font-size: 12px;
`;