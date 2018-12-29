import React, { Component } from 'react';
import { BLOCK_TYPES } from '../../config/dev';
import { BlockQuote } from '../Blockquote/index';
import { Expression } from '../Expression';
import { PillarBox } from "../PillarBox/index";
import { Reference } from '../Reference';
import { Paragraph } from '../Paragraph/index';
import { StatusBar } from '../StatusBar';
import { Subtitle } from "../Subtitle";
import { Loader } from "../Loader";
import { Title } from '../Title/index';
import { Image } from '../Image/index';
import { List } from '../List/index';
import { Code } from '../Code/index';
import s from './styles.css';

const renderBlock = block => {
  switch(block.type) {
    case BLOCK_TYPES.TEXT:
      return <Paragraph key={block._id} text={block.content} />;
    case BLOCK_TYPES.BLOCKQUOTE:
      return <BlockQuote key={block._id} text={block.content} />;
    case BLOCK_TYPES.CODE:
      return <Code key={block._id} snippet={block.content} />;
    case BLOCK_TYPES.IMAGE:
      const contents = block.content.split('\n');
      return (
        <Image
          key={block._id}
          url={contents[0]}
          caption={contents[1]}
          extended={contents[2] === 'true'}
        />
      );
    case BLOCK_TYPES.SUBTITLE:
      return <Subtitle key={block._id} text={block.content} />;
    case BLOCK_TYPES.REFERENCE:
      return <Reference key={block._id} references={block.content.split('\n')} />;
    case BLOCK_TYPES.EXPRESSION:
      return <Expression key={block._id} text={block.content} />;
    case BLOCK_TYPES.LIST:
      return <List key={block._id} items={block.content.split('\n')} />;
    default:
      return [];
  }
};

export class Article extends Component {
  constructor(props) {
    super(props);
    this.state ={
      scroll: 0,
    };

    this.onScroll = this.onScroll.bind(this);
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnMount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll() {
    this.setState({ scroll: this.getScrollPercent() });
  }

  getScrollPercent() {
    var h = document.documentElement,
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';
    return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
  }

  render() {
    const { data } = this.props;
    return (
      <div style={s.ARTICLE}>
        { /* <Loader /> */ }
        <PillarBox>
            { /* <StatusBar progress={this.state.scroll} /> */ }
          <Title text={data.title} created={data.created}/>
          {
            data.blocks.map(block => renderBlock(block))
          }
        </PillarBox>
      </div>
    )
  }
}
