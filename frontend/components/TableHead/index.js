import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './style.css';

export default class TableHead extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { columns } = this.props;
        return (
            <tr style={s.TR}>
                { columns.map(item => (<th style={s.TH} key={item}>{item}</th>)) }
            </tr>
        )
    }
}

TableHead.propTypes = {
    columns: PropTypes.array.isRequired,
};
