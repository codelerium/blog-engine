import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default class TableHead extends Component {
  constructor(props) {
      super(props);
  }

  render() {
    const { columns } = this.props;
    return (
      <StyledTr>
        { 
          columns.map(item => (
            <StyledTh key={item}>
              {item}
            </StyledTh>
          ))
        }
      </StyledTr>
    )
  }
}

TableHead.propTypes = {
    columns: PropTypes.array.isRequired,
};

const StyledTr = styled.tr`
  border-bottom: 1px solid ${p => p.theme.color['gray-10']};
`;

const StyledTh = styled.th`
  padding: ${p => p.theme.spacing.xs} ${p => p.theme.spacing.sm};
  text-align: left;
  font-size: 12px;
  text-transform: uppercase;
  color: ${p => p.theme.color['gray-30']}
`;
