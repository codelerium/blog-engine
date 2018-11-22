import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TableRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return this.props.children;
    }
}

TableRow.propTypes = {
    children: PropTypes.array.isRequired,
};

