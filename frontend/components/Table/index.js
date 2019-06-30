import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default class Table extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <StyledTable>
                <StyledTableHead>
                    {this.props.children[0]}
                </StyledTableHead>
                <tbody>
                    {this.props.children[1]}
                </tbody>
            </StyledTable>
        )
    }
}

Table.propTypes = {
  children: PropTypes.array.isRequired,
};

const StyledTable = styled.table`
    background: ${p => p.theme.color.white};
    width: 100%;
    border-collapse: collapse;
    border: 1px solid ${p => p.theme.color['gray-10']};
`;

const StyledTableHead = styled.thead`
    height: 40px;
`;