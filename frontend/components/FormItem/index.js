import React from 'react';
import styled from 'styled-components';

export const FormItem = ({ children }) => (
  <Wrapper>
    {children}
  </Wrapper>
);

const Wrapper = styled.div`
  margin-bottom: ${p => p.theme.spacing.sm}
`;
