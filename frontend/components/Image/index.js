import React from 'react';
import PropTypes from 'prop-types';
import s from './styles.css';

export const Image = props => (
  <div>
    <div
      style={{
        ...s.IMAGE_WRAPPER_OUTER,
        ...(props.extended ? {
          width: 'calc(100% + 120px)',
          margin: '60px 0 20px -60px',
        } : {
          width: '100%',
          margin: '0',
        })
      }}
    >
      <div style={s.IMAGE_WRAPPER_INNER}>
        <img style={s.IMAGE} src={props.url} />
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
  caption: PropTypes.string,
  extended: PropTypes.bool,
};
