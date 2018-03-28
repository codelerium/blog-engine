import React, { Component } from 'react';
import s from './styles.css'
import { PillarBox } from '../PillarBox/index';
import { Image } from '../Image/index';
import { Row } from '../Row/index';
import { Col } from '../Col/index';

export const Recommendations = () => (
  <div style={s.RECOMMENDATIONS}>
    <PillarBox extended>
      <Row style={{ margin: '0 -15px'}}>
        <Col>
          <div style={s.RECOMMENDATION}>
            <Image url={'http://localhost:8080/images/test.png'} />
            <div>Test image title</div>
          </div>
        </Col>
        <Col>
          <div style={s.RECOMMENDATION}>
            <Image url={'http://localhost:8080/images/test2.png'} />
            <div>Test image title 2 long</div>
          </div>
        </Col>
        <Col>
          <div style={s.RECOMMENDATION}>
            <Image url={'http://localhost:8080/images/test.png'} />
            <div>Test image title very</div>
          </div>
        </Col>
      </Row>
    </PillarBox>
  </div>
);
