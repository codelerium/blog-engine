import React, { useState } from 'react';
import styled from 'styled-components';

export const Select = ({ items, selected, onChange }) => {
  const [open, setOpen] = useState(false);

  const onItemClick = (item) => {
    setOpen(false);
    onChange(item);
  }

  return (
    <StyledSelect>
      <Selected onClick={() => setOpen(true)}>
        {selected}
      </Selected>
      <Items open={open}>
        {items.map(item => (
          <Item key={item} onClick={() => onItemClick(item)}>
            {item}
          </Item>
        ))}
      </Items>
    </StyledSelect>
  )
};

const StyledSelect = styled.div`
  position: relative;
  display: flex;
  height: ${p => p.theme.spacing.md};
  border: 1px solid ${p => p.theme.color['gray-20']};
  box-sizing: border-box;
  align-items: center;
  cursor: pointer;
`;

const Selected= styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 ${p => p.theme.spacing.xs};
  width: 100%;
  font-size: 14px;
`;

const Items = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  border: 1px solid ${p => p.theme.color['gray-20']};
  box-sizing: border-box;
  display: ${p => p.open ? 'block' : 'none'};
  background: ${p => p.theme.color.white};
  z-index: 1000;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  height: ${p => p.theme.spacing.md};
  padding: 0 ${p => p.theme.spacing.sm};
  font-size: 14px;

  :hover {
    background: ${p => p.theme.color['gray-5']}
  }
`;
