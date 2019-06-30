import React from 'react';
import styled from 'styled-components';

export const Editable = ({ children }) => (
  <EditableBlock>
    {children[0]}
    {children[1]}
  </EditableBlock>
);

const EditableBlock = styled.div`
    position: relative;

    > :last-child {
        display: flex;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(255, 255, 255, .9);
        opacity: 0;
        align-items: center;
        justify-content: center;
        transition: opacity .2s ease;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }

    :hover {

        > :last-child {
            content: '';
            opacity: 1;
        }
    }
`;