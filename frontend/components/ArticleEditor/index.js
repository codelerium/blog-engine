import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Guid from 'guid';
import arrayMove from 'array-move';
import {Input} from "../Input";
import {TextArea} from "../Textarea";
import {API} from "../../endpoints";
import { BLOCK_TYPES } from '../../config/dev';
import ArticleBlock from "../ArticleBlock";
import {Button} from "../Button";

export default class ArticleEditor extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      title: this.props.article.title,
      slug: this.props.article.slug,
      blocks: [],
      thumbnail: this.props.article.thumbnail,
    };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onArticleUpdate = this.onArticleUpdate.bind(this);
    this.onCreateBlock = this.onCreateBlock.bind(this);
    this.onDeleteBlock = this.onDeleteBlock.bind(this);
    this.onBlockContentChange = this.onBlockContentChange.bind(this);
    this.onInsertDown = this.onInsertDown.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      title: props.article.title,
      slug: props.article.slug,
      blocks: props.article.blocks || [],
      thumbnail: props.article.thumbnail,
    });
  }

  onTitleChange(title) {
    this.setState({ title });
  }

  onSlugChange(slug) {
    this.setState({ slug });
  }

  onThumbnailChange(thumbnail) {
    this.setState({ thumbnail });
  }

  onContentChange(content) {
    this.setState({ content });
  }

  onArticleUpdate() {
    API.UPDATE_ARTICLE({
      id: this.props.article._id,
      slug: this.state.slug,
      title: this.state.title,
      blocks: this.state.blocks,
      thumbnail: this.state.thumbnail,
    }).then(res => {
      console.log(res)
    }).catch(err => console.log(err));
  }

  onCreateBlock() {
    this.setState({
      blocks: [
        ...this.state.blocks,
        {
          _id: Guid.raw(),
          type: BLOCK_TYPES.TEXT,
          content: '',
        }
      ]
    });
  }

  onDeleteBlock(id) {
    this.setState({
      blocks: this.state.blocks.filter(b => b._id !== id),
    });
  }

  onBlockContentChange(id, text) {
    this.setState({
      blocks: this.state.blocks.map(b => (
        b._id === id ? {
          ...b,
          content: text,
        } : b
      )),
    });
  }

  onBlockTypeChange(id, type) {
    this.setState({
      blocks: this.state.blocks.map(b => (
        b._id === id ? {
          ...b,
          type,
        } : b
      )),
    });
  }

  onMoveUp(index) {
    this.setState({
      blocks: arrayMove(this.state.blocks, index, index - 1),
    })
  }

  onMoveDown(index) {
    this.setState({
      blocks: arrayMove(this.state.blocks, index, index + 1),
    })
  }

  onInsertDown(index) {
    const item = {
      _id: Guid.raw(),
      type: BLOCK_TYPES.TEXT,
      content: '',
    };
    const { blocks } = this.state;
    blocks.splice(index + 1, 0, item);
    this.setState({ blocks });
  }

  renderBlocks() {
    return this.state.blocks.map((block, index) => (
      <ArticleBlock
        key={block._id}
        type={block.type}
        content={block.content}
        onDelete={() => this.onDeleteBlock(block._id)}
        onBlockTypeChange={(type) => this.onBlockTypeChange(block._id, type)}
        onTextChange={(text) => this.onBlockContentChange(block._id, text)}
        onInsertDown={() => this.onInsertDown(index)}
        onMoveUp={() => this.onMoveUp(index)}
        onMoveDown={() => this.onMoveDown(index)}
      />
    ))
  }

  render() {
    return(
      <div>
        <div style={{ display: 'flex' }}>
          <Input onChange={e => this.onTitleChange(e.target.value)} value={this.state.title}/>
          <Input onChange={e => this.onSlugChange(e.target.value)} value={this.state.slug}/>
          <Input onChange={e => this.onThumbnailChange(e.target.value)} value={this.state.thumbnail}/>
        </div>
        {this.state.blocks.length > 0 && this.renderBlocks()}
        <div style={{ display: 'flex' }}>
          <Button onClick={this.onArticleUpdate} title="Update article"/>
          <Button onClick={this.onCreateBlock} title="Create block"/>
        </div>
      </div>
    )
  }
}

ArticleEditor.propTypes = {
  article: PropTypes.object.isRequired,
};
