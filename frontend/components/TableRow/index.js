import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { Button } from '../Button';

export default class TableRow extends Component {
    constructor(props) {
        super(props);
    }

    isSlug(source, property) {
      return source.hasOwnProperty(property) && property === 'slug';
    }

    renderRow() {
      const { source, properties } = this.props;

      return properties.map(property => (
        <StyledTd key={property}>
          {
            this.isSlug(source, property) ? (
              <StyledLink to={`/admin/${source.slug}`}>
                {source[property]}
              </StyledLink>
            ) : source[property]
          }
        </StyledTd>)
      );
    }

    render() {
      const { actions } = this.props;

      return (
        <StyledTr>
          { this.renderRow() }
          <Button title="delete" onClick={actions.onDelete} />
        </StyledTr>
      );
    }
}

TableRow.propTypes = {
  source: PropTypes.object.isRequired,
  properties: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

const StyledLink = styled(Link)`
  :hover {
    background: ${p => p.theme.color['gray-10']};
  }
`;

const StyledTr = styled.tr`
  border-bottom: 1px solid ${p => p.theme.color['gray-10']};
`;

const StyledTd = styled.th`
  padding: ${p => p.theme.spacing.xs} ${p => p.theme.spacing.sm};
  text-align: left;
  font-size: 14px;
`;
