import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <a href="/" style={{ display: 'flex' }}>
                <img style={{ width: 40, height: 40, margin: 20 }} src="/images/logo-01.svg" />
            </a>
        )
    }
}