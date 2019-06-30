import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

export const TextArea = props => (
  <div>
    {props.label !== '' && typeof props.label === 'string' && (
      <Label>
        {props.label}
      </Label>
    )}
    <Wrapper
      onBlur={props.autosave}
      height={props.height}
      placeholder={props.placeholder || 'What is in your mind?'}
      onChange={props.onChange}
      value={props.value}
    />
  </div>
);

TextArea.defaultProps = {
  autosave: () => {},
}

TextArea.propTypes = {
  onChange: PropTypes.func.isRequired,
  autosave: PropTypes.func,
  value: PropTypes.string.isRequired,
  height: PropTypes.number,
};

const Wrapper = styled.textarea`
  height: ${p => p.theme.spacing.md};
  ${p => p.height > 0 && css`
    min-height: ${p => p.height}px;
  `}
  width: 100%;
  border: 1px solid ${p => p.theme.color['gray-30']};
  background: transparent;
  padding: ${p => p.theme.spacing.xs};
  margin-bottom: ${p => p.theme.spacing.sm};
  overflow: auto;
  resize: none;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${p => p.theme.spacing.xs};
  font-size: 12px;
  text-transform: uppercase;  
`;
