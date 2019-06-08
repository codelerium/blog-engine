import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const TextArea = props => (
  <Wrapper
    placeholder="What is in your mind?"
    onChange={props.onChange}
    value={props.value}
  />
);

TextArea.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

const Wrapper = styled.textarea`
  height: ${p => p.theme.spacing.md};
  width: 100%;
  border: 1px solid ${p => p.theme.color['gray-30']};
  background: transparent;
  padding: ${p => p.theme.spacing.xs};
  margin-bottom: ${p => p.theme.spacing.sm};
  overflow: auto;
  resize: none;
  font-size: 14px;
  outline: none;
`;