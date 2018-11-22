import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import s from './style.css';
import { Button } from "../Button";

export default class TableRow extends Component {
    constructor(props) {
        super(props);
    }

    renderRow() {
        const { source, properties, actions } = this.props;
        return [
            ...properties.map(property => (<td style={s.TD} key={property}>{source[property]}</td>)),
            <td style={{ ...s.TD, display: 'flex' }} key="actions">
                <Button onClick={() => actions.onDelete(source._id)} title={'Delete'}/>
                <Button onClick={() => actions.onEdit(source._id)} title={'Edit'}/>
                <Button>
                    <Link
                        style={{
                            color: 'black',
                            textDecoration: 'none',
                            cursor: 'pointer',
                        }}
                        target="_blank"
                        to={`/article/${source.slug}`}
                    >
                        Preview
                    </Link>
                </Button>
            </td>
        ];
    }

    render() {
        return (
            <tr style={s.TR}>
                { this.renderRow() }
            </tr>
        );
    }
}

TableRow.propTypes = {
    source: PropTypes.object.isRequired,
    properties: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
};
