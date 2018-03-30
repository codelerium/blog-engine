import React from 'react';
import {PillarBox} from "../PillarBox/index";

export const Footer = () => (
  <div>
    <PillarBox>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ height: 60, width: 240, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a style={{ width: 40, height: 40 }} href="#">
            <img src={'http://localhost:8080/images/facebook.svg'}/>
          </a>
          <a style={{ width: 40, height: 40 }} href="#">
            <img src={'http://localhost:8080/images/github.svg'}/>
          </a>
          <a style={{ width: 40, height: 40 }} href="#">
            <img src={'http://localhost:8080/images/instagram.svg'}/>
          </a>
          <a style={{ width: 40, height: 40 }} href="#">
            <img src={'http://localhost:8080/images/linkedin.svg'}/>
          </a>
        </div>
      </div>
    </PillarBox>
  </div>
);
