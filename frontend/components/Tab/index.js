import React, { useState } from 'react';
import styled, { css } from 'styled-components';

export const Tab = ({ items, contents, selected, onTabChange }) => {
  const renderTabItems = () => {
    if (!Array.isArray(items)) {
      console.warn('Props [items] must be an array');
      return;
    }

    if (items.length === 0) {
      console.warn('Props [items] must have at least one element');
      return;
    }

    if (items.some(item => typeof item !== 'string')) {
      console.warn('Props [items] should only contain strings');
      return;
    }

    return items.map((item, idx) => (
      <TabItem
        key={item}
        selected={selected === idx}
        onClick={() => onTabChange(idx)}
      >
        {item}
      </TabItem>
    ));
  }

  const renderTabContents = () => {
    return contents.map((content, idx) => (
      <TabContent key={idx} selected={selected === idx}>
        {content}
      </TabContent>
    ));
  }
  
  return (
    <>
      <TabItems>
        {renderTabItems()}
      </TabItems>
      <TabContents>
        {renderTabContents()}
      </TabContents>
    </>
  )
}

const TabItems = styled.div`
  display: flex;
`;

const TabItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  position: relative;
  height: ${p => p.theme.spacing.md};
  border-bottom: 1px solid ${p => p.theme.color['gray-10']};
  margin-bottom: ${p => p.theme.spacing.md};
  color: ${p => p.theme.color['gray-90']};
  flex: 1;

  ${p => p.selected && css`
    :after {
      position: absolute;
      display: block;
      content: '';
      bottom: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: ${p => p.theme.color.black};
    }
  `}
`;

const TabContents = styled.div`
  display: block;
`;

const TabContent = styled.div`
  display: ${p => p.selected ? 'block' : 'none'}
`;