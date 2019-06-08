import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';

const LOADER_ITEMS = 12;
const ITEM_WIDTH = 12;
const ITEM_HEIGHT = 3;
const RADIUS = 16;
const VELOCITY = 1.5;

export const Loader = (props) => (
  <LoaderOuter width={props.width} height={props.height}>
    <LoaderInner>
      {
        Array.from({ length: LOADER_ITEMS }).map((_, idx) => (
          <LoaderItem
            key={idx}
            idx={idx}
            width={ITEM_WIDTH}
            height={ITEM_HEIGHT}
            num={LOADER_ITEMS}
            velocity={VELOCITY}
            radius={RADIUS}
          />
        ))
      }
    </LoaderInner>
  </LoaderOuter>
);

Loader.defaultProps = {
  width: 60,
  height: 60,
}

Loader.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}

const LoaderOuter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.width};
  height: ${props => props.height};
`;

const LoaderInner = styled.div`
  position: relative;
`;

const blink = keyframes`
  0% {
    background: #ddd;
  }
  100% {
    background: #333;
  }
`;

const LoaderItem = styled.div`
  position: absolute;
  width: ${p => `${p.width}px`};
  height: ${p => `${p.height}px`};
  background: transparent;
  border-radius: ${props => `${props.height / 2}px`}; 
  animation: ${blink} ${props => `${1 / props.velocity}s`} linear ${props => `${props.idx / props.num / props.velocity}s`} infinite;
  transform:
    translate(
      ${props => (Math.cos(Math.PI * 2 / props.num * props.idx) * props.radius) - (props.width / 2)}px,
      ${props => (Math.sin(Math.PI * 2 / props.num * props.idx) * props.radius) - (props.height / 2)}px
    )
    rotate(
      ${props => `${360 / props.num * props.idx}deg`}
    );
`;