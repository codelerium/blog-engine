import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '../Avatar';
import s from './style.css';

export const Comment = props => (
  <div style={{ display: 'flex', padding: '15px 0' }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Avatar url={props.comment.commenter.avatar} />
      {
        props.comment.replies && !!props.comment.replies.length && (
          <div style={s.DECOR_LINE}/>
        )
      }
    </div>
    <div style={s.COMMENT}>
      <span style={s.COMMENT_NAME}>
        {props.comment.commenter.name}
      </span>
      {props.comment.content}
      <div style={{ marginTop: 8 }}>
        <button 
          style={{ paddingLeft: 0, border: 'none', background: 'transparent', fontSize: '14px' }}
          onClick={props.onLike}
        >
          Like
        </button>
        <button style={{ border: 'none', background: 'transparent', fontSize: '14px' }}>Reply</button>
        <span style={{ fontSize: '14px' }}>
          <span style={{ display: 'inline-block', marginLeft: 20 }}>{props.comment.likes} Likes</span>
          <span style={{ display: 'inline-block', marginLeft: 10 }}>{props.comment.timestamp}</span>
        </span>
      </div>
      {
        props.comment.replies && !!props.comment.replies.length && props.comment.replies.map((reply) => (
          <div key={reply.id} style={{ marginTop: 20, display: 'flex' }}>
            <Avatar url={props.comment.commenter.avatar} />
            <div style={s.COMMENT}>
              <span style={s.COMMENT_NAME}>
                {reply.name}
              </span>
              {reply.content}
              <div style={{ marginTop: 8 }}>
                <button style={{ paddingLeft: 0, border: 'none', background: 'transparent', fontSize: '14px' }}>Like</button>
                <span style={{ fontSize: '14px' }}>
                  <span style={{ display: 'inline-block', marginLeft: 20 }}>{reply.likes} Likes</span>
                  <span style={{ display: 'inline-block', marginLeft: 10 }}>{reply.timestamp}</span>
                </span>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  </div>
);

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  onLike: PropTypes.func.isRequired,
};
