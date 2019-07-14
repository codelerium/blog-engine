import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Date = props => (
  <Wrapper>
    {props.text}
  </Wrapper>
);

Date.propTypes = {
  text: PropTypes.string.isRequired,
};

const Wrapper = styled.div`
  font-size: 14px;
  color: ${p => p.theme.color['gray-70']};
`;