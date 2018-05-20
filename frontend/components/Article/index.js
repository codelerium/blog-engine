import React from 'react';
import { Paragraph } from '../Paragraph/index';
import { Title } from '../Title/index';
import { BlockQuote } from '../Blockquote/index';
import Code from '../Code/index';
import { Image } from '../Image/index';
import s from './styles.css';
import {PillarBox} from "../PillarBox/index";
import {Subtitle} from "../Subtitle";
import {Loader} from "../Loader";
import { BLOCK_TYPES } from '../../config/dev';

const renderBlock = block => {
  switch(block.type) {
    case BLOCK_TYPES.TEXT: 
      return <Paragraph key={block._id} text={block.content} />
      break;
    case BLOCK_TYPES.BLOCKQUOTE: 
      return <BlockQuote key={block._id} text={block.content} />
      break;
    case BLOCK_TYPES.CODE: 
      return <Code key={block._id} snippet={block.content} />
      break;
    case BLOCK_TYPES.IMAGE: 
      return <Image key={block._id} url={block.content} />
      break;
    case BLOCK_TYPES.SUBTITLE: 
      return <Subtitle key={block._id} text={block.content} />
      break;
    default: 
      return [];
      break; 
  }
} 

export const Article = props => (
  <div style={s.ARTICLE}>
    <Loader />
    <PillarBox>
      <Title text={props.data.title} created={props.data.created}/>
      {
        props.data.blocks.map(block => renderBlock(block))
      }
    </PillarBox>
  </div>
);
