import React, { Component } from 'react';
import { PillarBox } from "../PillarBox";
import { Title } from '../Title';
import { renderBlock } from '../Block';
import s from './styles.css';

export class Article extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;
    return (
      <div style={s.ARTICLE}>
        <PillarBox>
          <Title text={data.title} created={data.created}/>
          {
            data.blocks.map(block => renderBlock(block))
          }
        </PillarBox>
      </div>
    )
  }
}
