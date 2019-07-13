import React from 'react';
import PropTypes from 'prop-types';
import s from './styles.css';

export const Video = props => (
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
        {/* <img style={s.IMAGE} src={props.url} /> */}
        <video style={s.IMAGE} autoPlay loop muted playsInline>
          <source src={props.url} type="video/webm"></source>
        </video>
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

Video.defaultProps = {
  caption: '',
  extended: false,
};

Video.propTypes = {
  url: PropTypes.string.isRequired,
  caption: PropTypes.string,
  extended: PropTypes.bool,
};
