import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Guid from 'guid';
import { Comment } from '../Comment';
import { PillarBox } from "../PillarBox";
import { TextArea } from "../Textarea";
import { Avatar } from "../Avatar";
import { Button, BUTTON_TYPE } from "../Button";
import { setCookie, getCookie } from '../../helpers';
import { API } from "../../endpoints";
import styled from 'styled-components';

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      comments: [],
      commenter: null,
      asyncFinished: false,
    };
    this.onTextChange = this.onTextChange.bind(this);
    this.onSend = this.onSend.bind(this);
    this.onLike = this.onLike.bind(this);

    const { articleId } = this.props;
    
    Promise.all([
      API.RETRIEVE_COMMENTS_BY_ARTICLE({ articleId }),
      API.RETRIEVE_COMMENTER({ commenterId: getCookie('c_user_id') })
    ]).then(([comments, commenter]) => {
        this.setState({ comments, commenter, asyncFinished: true });
      });
  }

  onTextChange(e) {
    this.setState({ text: e.target.value });
  }

  onLike(id) {
    const { comments } = this.state;
    API.LIKE_COMMENT({ id })
      .then((updatedComment) => {
        this.setState({
          comments: comments.map((comment) => (
            comment._id === id ? updatedComment : comment
          )),
        }, () => {
          console.log(this.state.comments)
        });
      })
      .catch(err => (console.log(err)));
  }

  onSend(e) {
    const { text, comments, commenter } = this.state;
    const { articleId } = this.props;
    const user = e.target ? { 
      profile: {
        ...commenter,
        id: commenter._id,
        picture: {
          data: {
            url: commenter.avatar,
          }
        }
      } 
    } : e;
    API.CREATE_COMMENTER(user)
      .then((commenter) => {
        setCookie('c_user_id', commenter._id);
        API.CREATE_COMMENT({ 
          text: text.trim(),
          id: Guid.raw(),
          commenter,
          articleId,
        }).then((comment) => {
            this.setState({ comments: [comment, ...comments], text: '' });
          });
      })
      .catch(err => console.log(err));
  }

  renderComments() {
    const { comments } = this.state;
    if (comments.length === 0) {
      return (
        <p>There are no comments yet. Be the first!</p>
      );
    }
    return comments.map((comment) => (
      <Comment 
        key={comment._id}
        comment={comment}
        onLike={() => this.onLike(comment._id)}
      />
    ));
  }

  renderCommentButton() {
    const { asyncFinished, commenter } = this.state;
    if (!asyncFinished) {
      return false;
    }
    return (
      <Button
        type={!commenter ? BUTTON_TYPE.LOGIN : BUTTON_TYPE.PRIMARY}
        onClick={this.onSend}
        title="Comment"
      />
    )
  }

  render() {
    const { commenter } = this.state;
    return (
      <CommentsWrapper>
        <PillarBox>
          <CommentsInner>
            <CommentTitle>
              Leave your thoughts
            </CommentTitle>
            <CommentWrapper>
              <Avatar url={(commenter || {}).avatar} />
              <CommentInput>
                <TextArea onChange={this.onTextChange} value={this.state.text}/>
              </CommentInput>
              {this.renderCommentButton()}
            </CommentWrapper>
            {this.renderComments()}
          </CommentsInner>
        </PillarBox>
      </CommentsWrapper>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
  articleId: PropTypes.string.isRequired,
};

const CommentWrapper = styled.div`
  display: flex;
`;

const CommentsWrapper = styled.div`
  padding: 160px 0;
  border-top: 1px solid ${props => props.theme.color['gray-10']};
`;

const CommentsInner = styled.div`
  width: 100%;
`;

const CommentInput = styled.div`
  margin: 0 20px;
  flex: 1;
`;

const CommentTitle = styled.h2`
  margin-bottom: ${props => props.theme.spacing.md};
`;