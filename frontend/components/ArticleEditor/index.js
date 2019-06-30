import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Guid from 'guid';
import arrayMove from 'array-move';
import { Title } from "../Title";
import { Input } from "../Input";
import { API } from "../../endpoints";
import { BLOCK_TYPES } from '../../config/dev';
import ArticleBlock from "../ArticleBlock";
import { PillarBox } from '../PillarBox';
import { Button } from '../Button';
import { TextArea } from '../Textarea';
import { Tab } from '../Tab';
import { Editable } from '../Editable';
import { FormItem } from '../FormItem';
import { Select } from '../Select';
import styled from 'styled-components';

export default class ArticleEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.article.title,
      slug: this.props.article.slug,
      blocks: this.props.article.blocks,
      thumbnail: this.props.article.thumbnail,
      intro: this.props.article.intro,
      sidebarSize: 480,
      selectedBlockId: null,
      selectedTab: 0,
    };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onArticleUpdate = this.onArticleUpdate.bind(this);
    this.onCreateBlock = this.onCreateBlock.bind(this);
    this.onDeleteBlock = this.onDeleteBlock.bind(this);
    this.onBlockContentChange = this.onBlockContentChange.bind(this);
    this.onThumbnailChange = this.onThumbnailChange.bind(this);
    this.onIntroChange = this.onIntroChange.bind(this);
    this.onInsertDown = this.onInsertDown.bind(this);
    this.onBlockSelect = this.onBlockSelect.bind(this);
    this.onTabSelect = this.onTabSelect.bind(this);
  }

  onTabSelect(idx) {
    this.setState({
      selectedTab: idx,
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

  onIntroChange(intro) {
    this.setState({ intro });
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
      intro: this.state.intro,
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
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

  onBlockSelect(selectedBlockId) {
    this.setState({
      selectedBlockId,
      selectedTab: 1,
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
    if (!blocks) {
      this.setState({ blocks: [item] });
    }

    blocks.splice(index + 1, 0, item);
    this.setState({ blocks });
  }

  renderBlocks() {
    return this.state.blocks.map((block, index) => (
      <ArticleBlock
        key={block._id}
        type={block.type}
        block={block}
        content={block.content}
        onSelect={() => this.onBlockSelect(block._id)}
        onDelete={() => this.onDeleteBlock(block._id)}
        onInsertDown={() => this.onInsertDown(index)}
        onMoveUp={() => this.onMoveUp(index)}
        onMoveDown={() => this.onMoveDown(index)}
      />
    ))
  }

  render() {
    const {
      selectedBlockId,
      title,
      sidebarSize,
      blocks,
      slug,
      thumbnail,
      selectedTab,
      intro,
    } = this.state;
    
    const selectedBlock = (blocks || []).find(block => block._id === selectedBlockId) || null;

    return(
      <>
        <ScrollWrapper size={sidebarSize}>
          <Editable>
            <PillarBox>
              <Title text={title} created={this.props.article.created}/>
            </PillarBox>
            <div>
              <Button onClick={() => this.onTabSelect(0)} title="Edit"/>
              <Button onClick={() => this.onInsertDown(0)} title="Insert block"/>
            </div>
          </Editable>
          {blocks && blocks.length > 0 && this.renderBlocks()}
        </ScrollWrapper>
        <ContextBar size={sidebarSize}>
          <Tab
            items={[
              'general',
              'block'
            ]}
            selected={selectedTab}
            onTabChange={this.onTabSelect}
            contents={[
              <ContextBarGroup>
                <FormItem>
                  <Input
                    label="Title"
                    autosave={this.onArticleUpdate}
                    onChange={e => this.onTitleChange(e.target.value)}
                    value={title}
                  />
                </FormItem>
                <FormItem>
                  <Input
                    label="Slug"
                    autosave={this.onArticleUpdate}
                    onChange={e => this.onSlugChange(e.target.value)}
                    value={slug}
                  />
                </FormItem>
                <FormItem>
                  <Input
                    label="Thumbnail"
                    autosave={this.onArticleUpdate}
                    onChange={e => this.onThumbnailChange(e.target.value)}
                    value={thumbnail}
                  />
                </FormItem>
                <FormItem>
                  <TextArea
                    label="Introduction"
                    height={200}
                    autosave={this.onArticleUpdate}
                    onChange={e => this.onIntroChange(e.target.value)}
                    placeholder="Short inroduction"
                    value={intro}
                  />
                </FormItem>
              </ContextBarGroup>,
              <ContextBarGroup>
                {selectedBlockId && (
                  <>
                    <FormItem>
                      <Select
                        onChange={this.onBlockTypeChange.bind(this, selectedBlockId)}
                        items={Object.values(BLOCK_TYPES)}
                        selected={selectedBlock.type}
                      />
                    </FormItem>
                    <FormItem>
                      <TextArea
                        autosave={this.onArticleUpdate}
                        height={200}
                        onChange={(e) => this.onBlockContentChange(selectedBlockId, e.target.value)}
                        value={selectedBlock.content}
                      />
                    </FormItem>
                  </>
                )}
              </ContextBarGroup>
            ]}
          />
        </ContextBar>
      </>
    )
  }
}

ArticleEditor.propTypes = {
  article: PropTypes.object.isRequired,
};

const ScrollWrapper = styled.div`
  width: ${p => `calc(100% - ${p.size}px)`};
  height: 100%;
  overflow: auto;
  padding: 120px 0 60px;
  box-sizing: border-box;
`;

const ContextBar = styled.div`
  border-left: 1px solid ${p => p.theme.color['gray-10']};
  width: ${p => p.size}px;
  box-sizing: border-box;
  padding: 40px;
`;

const ContextBarGroup = styled.div`
  margin-bottom: 40px;
`;