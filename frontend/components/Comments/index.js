import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Comment } from '../Comment/index';
import { PillarBox } from "../PillarBox/index";
import s from './style.css';
import {TextArea} from "../Textarea/index";

export default class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
    this.onTextChange = this.onTextChange.bind(this);
  }

  onTextChange(e) {
    this.setState({ text: e.target.value });
  }

  renderComments() {
    return this.props.comments.map((comment, i) => (
      <Comment key={i} text={comment.text} name={comment.name || ''}/>
    ))
  }

  render() {
    return (
      <div style={{ padding: '60px 0', background: '#f5f5f5' }}>
        <PillarBox>
          <TextArea onChange={this.onTextChange} value={this.state.text}/>
          <button style={s.BUTTON}>Send</button>
          <div style={{ fontWeight: 700 }}>{`${this.props.comments.length} comments`}</div>
          {this.renderComments()}
        </PillarBox>
      </div>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
};
