import React from 'react';
import { BLOCK_TYPES } from '../../config/dev';
import { BlockQuote } from '../Blockquote/index';
import { Expression } from '../Expression';
import { Reference } from '../Reference';
import { Paragraph } from '../Paragraph/index';
import { Subtitle } from "../Subtitle";
import { Image } from '../Image/index';
import { List } from '../List/index';
import { Code } from '../Code/index';

export const renderBlock = block => {
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
