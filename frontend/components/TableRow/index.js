import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';

export default class TableRow extends Component {
    constructor(props) {
        super(props);
    }

    isSlug(source, property) {
      return source.hasOwnProperty(property) && property === 'slug';
    }

    isPublished(source, property) {
      return source.hasOwnProperty(property) && property === 'published';
    }

    renderRow() {
      const { source, properties, actions } = this.props;

      return properties.map(property => (
        <StyledTd key={property}>
          {
            this.isSlug(source, property) ? (
              <StyledLink to={`/admin/${source.slug}`}>
                {source[property]}
              </StyledLink>
            ) : this.isPublished(source, property) ? (
              <Checkbox
                id={source._id}
                checked={source[property]}
                onChange={actions.onPublishChange}
              />
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
