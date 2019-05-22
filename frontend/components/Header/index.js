import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import s from './style.less';

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
            <div className={`${s.wrapper} ${closed && s.closed}`}>
                <Link to="/" className={s.logo}>
                    <img src="/images/logo-01.svg" />
                </Link>
                <div className={s.menu}>
                    <Link className={s.menuitem} to="/about">About</Link>
                    <Link className={s.menuitem} to="/roadmap">Roadmap</Link>
                    <Link className={s.menuitem} to="/contact">Contact</Link>
                </div>
            </div>
        )
    }
}