import React from 'react';
import { BLOCK_TYPES } from '../../config/dev';
import { BlockQuote } from '../Blockquote';
import { Expression } from '../Expression';
import { Reference } from '../Reference';
import { Paragraph } from '../Paragraph';
import { Subtitle } from "../Subtitle";
import { Image } from '../Image';
import { Video } from '../Video';
import { List } from '../List';
import { Code } from '../Code';

export const renderBlock = block => {
  switch(block.type) {
    case BLOCK_TYPES.TEXT:
      return <Paragraph key={block._id} text={block.content} />;
    case BLOCK_TYPES.BLOCKQUOTE:
      return <BlockQuote key={block._id} text={block.content} />;
    case BLOCK_TYPES.CODE:
      return <Code key={block._id} snippet={block.content} />;
    case BLOCK_TYPES.VIDEO: {
      const contents = block.content.split('\n');
      return (
        <Video
          key={block._id}
          url={contents[0]}
          caption={contents[1]}
          extended={contents[2] === 'true'}
        />
      );
    }
    case BLOCK_TYPES.IMAGE: {
      const contents = block.content.split('\n');
      return (
        <Image
          key={block._id}
          url={contents[0]}
          caption={contents[1]}
          extended={contents[2] === 'true'}
        />
      );
    }
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
