import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Input = props => (
  <div>
    <StyledInput
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
  errMsg: '',
}

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  hasErr: PropTypes.bool,
  errMsg: PropTypes.string,
};

const StyledInput = styled.input`
  width: 100%;
  height: ${p => p.theme.spacing.md};
  padding: 0 ${p => p.theme.spacing.xs};
  font-size: 14px;
  border: 1px solid ${p => p.hasErr ? p.theme.color.red : p.theme.color['gray-30']};
  background: transparent;
  outline: none;
`;

const InputError = styled.p`
  color: ${p => p.theme.color.red};
  font-size: 14px;
  margin: 10px 0;
  text-align: center;
`;