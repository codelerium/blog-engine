import React from 'react';
import PropTypes from 'prop-types';
import s from './styles.css';

export const Image = props => (
  <div style={{
      ...s.IMAGE_WRAPPER_OUTER,
      ...(props.extended && window.innerWidth > 768 ? {
          width: 'calc(100% + 100px)',
          marginLeft: '-50px',
      } : {
          width: '100%',
          margin: '0',
      })
  }}>
    <div style={s.IMAGE_WRAPPER_MIDDLE}>
      <div style={s.IMAGE_WRAPPER_INNER}>
        <img
          style={s.IMAGE}
          src={props.url}
          alt={props.caption || 'Static image element'}
        />
      </div>
    </div>
    {
      props.caption &&
        <div style={s.CAPTION}>
          {props.caption}
        </div>
    }
  </div>
);

Image.defaultProps = {
  caption: '',
  extended: false,
};

Image.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string,
  caption: PropTypes.string,
  extended: PropTypes.bool,
};
