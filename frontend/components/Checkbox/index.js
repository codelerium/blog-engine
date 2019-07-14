import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Checkbox = ({ checked, id, onChange }) => {
  const onCheckBoxChange = () => {
    const newState = !checked;
    onChange(id, newState);
  };

  return (
    <Wrapper onClick={onCheckBoxChange}>
      <Tick checked={checked} />
      <Input readOnly checked={checked} id={id} type="checkbox" />
    </Wrapper>
  );
};

Checkbox.defaultProps = {
  checked: false,
}

Checkbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool,
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  box-sizing: border-box;
  border: 2px solid ${p => p.theme.color.black};
  background: ${p => p.theme.color.white};
`;

const Tick = styled.div`
  width: 12px;
  height: 12px;
  background: ${p => p.checked ? 'black' : 'transparent'};
`;

const Input = styled.input`
  display: none;
`;