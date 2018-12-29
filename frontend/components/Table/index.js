import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Table extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <table style={{ background: 'white', width: '100%', borderCollapse: 'collapse', border: '1px solid lightgray' }}>
                <thead>
                    {this.props.children[0]}
                </thead>
                <tbody>
                    {this.props.children[1]}
                </tbody>
            </table>
        )
    }
}

Table.propTypes = {
  children: PropTypes.array.isRequired,
};
