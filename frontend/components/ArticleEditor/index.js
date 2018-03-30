import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Input} from "../Input/index";
import {TextArea} from "../Textarea/index";

export default class ArticleEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.article.title,
      content: ''
    };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      title: props.article.title,
    });
  }

  onTitleChange(title) {
    this.setState({ title });
  }

  onContentChange(content) {
    this.setState({ content });
  }

  render() {
    return(
      <div>
        <Input onChange={e => this.onTitleChange(e.target.value)} value={this.state.title}/>
        <TextArea onChange={e => this.onContentChange(e.target.value)} value={this.state.content}/>
        <button onClick={() => {}}>Update article</button>
      </div>
    )
  }
}

ArticleEditor.propTypes = {
  article: PropTypes.object.isRequired,
};