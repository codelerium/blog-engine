import React from 'react';
import PropTypes from 'prop-types';
import s from './style.css';

export const Avatar = props => (
    <div style={s.AVATAR_WRAPPER}>
        <img
            style={s.AVATAR}
            src={props.url || '/images/logo-01.svg'}
            alt="codelirium logo"
        />
    </div>
);

Avatar.propTypes = {
  url: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
  ]),
};
