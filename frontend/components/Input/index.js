import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Input = props => (
  <div>
    {props.label !== '' && typeof props.label === 'string' && (
      <Label>
        {props.label}
      </Label>
    )}
    <StyledInput
      onBlur={props.autosave}
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
      type={props.type || 'text'}
    />
    {
      props.hasErr && (
        <InputError>
          {props.errMsg}
        </InputError>
      )
    }
  </div>
);

Input.defaultProps = {
  hasErr: false,
  autosave: () => {},
  errMsg: '',
  label: '',
}

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  autosave: PropTypes.func,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  hasErr: PropTypes.bool,
  errMsg: PropTypes.string,
  label: PropTypes.string,
};

const StyledInput = styled.input`
  width: 100%;
  height: ${p => p.theme.spacing.md};
  padding: 0 ${p => p.theme.spacing.xs};
  font-size: 14px;
  border: 1px solid ${p => p.hasErr ? p.theme.color.red : p.theme.color['gray-30']};
  background: transparent;
  outline: none;
  box-sizing: border-box;
`;

const InputError = styled.p`
  color: ${p => p.theme.color.red};
  font-size: 14px;
  margin: 10px 0;
  text-align: center;
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${p => p.theme.spacing.xs};
  font-size: 12px;
  text-transform: uppercase;  
`;