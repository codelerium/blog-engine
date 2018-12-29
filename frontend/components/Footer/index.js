import React from 'react';
import {PillarBox} from "../PillarBox/index";

export const Footer = () => (
  <div style={{ background: 'black' }}>
    <PillarBox>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ height: 60, width: 240, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a style={{ filter: 'invert(1)', width: 32, height: 32 }} href="#">
            <img src={'/images/facebook.svg'}/>
          </a>
          <a style={{ filter: 'invert(1)', width: 32, height: 32 }} href="#">
            <img src={'/images/github.svg'}/>
          </a>
          <a style={{ filter: 'invert(1)', width: 32, height: 32 }} href="#">
            <img src={'/images/instagram.svg'}/>
          </a>
          <a style={{ filter: 'invert(1)', width: 32, height: 32 }} href="#">
            <img src={'/images/linkedin.svg'}/>
          </a>
        </div>
      </div>
    </PillarBox>
  </div>
);
