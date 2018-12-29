import React from 'react';
import PropTypes from 'prop-types';
import s from './style.css';

export const Comment = props => (
  <div style={{ display: 'flex', padding: '15px 0' }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={s.AVATAR_WRAPPER}>
        <img
          style={s.AVATAR}
          src={'/images/logo-01.svg'}
        />
      </div>
      {
        !!props.comment.replies.length && (
          <div style={s.DECOR_LINE}/>
        )
      }
    </div>
    <div style={s.COMMENT}>
      <span style={s.COMMENT_NAME}>
        {props.comment.name}
      </span>
      {props.comment.text}
      <div style={{ marginTop: 8 }}>
        <button style={{ paddingLeft: 0, border: 'none', background: 'transparent', fontSize: '14px' }}>Like</button>
        <button style={{ border: 'none', background: 'transparent', fontSize: '14px' }}>Reply</button>
        <span style={{ fontSize: '14px' }}>
          <span style={{ display: 'inline-block', marginLeft: 20 }}>{props.comment.likes} Likes</span>
          <span style={{ display: 'inline-block', marginLeft: 10 }}>{props.comment.timestamp}</span>
        </span>
      </div>
      {
        !!props.comment.replies.length && props.comment.replies.map((reply) => (
          <div key={reply.id} style={{ marginTop: 20, display: 'flex' }}>
            <div style={s.AVATAR_WRAPPER}>
              <img
                style={s.AVATAR}
                src={'/images/logo-01.svg'}
              />
            </div>
            <div style={s.COMMENT}>
              <span style={s.COMMENT_NAME}>
                {reply.name}
              </span>
              {reply.text}
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
};
