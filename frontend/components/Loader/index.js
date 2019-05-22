import React from 'react';
import PropTypes from 'prop-types';
import s from './styles.less';

const LOADER_ITEMS = 12;

export const Loader = (props) => (
  <div 
    style={{
      width: props.width,
      height: props.height,
    }}
    className={s.container}
  >
    <div className={s.loader}>
      {
        Array.from({ length: LOADER_ITEMS }).map((_, i) => (
          <div key={i} className={s.loader__item} />
        ))
      }
    </div>
  </div>
);

Loader.defaultProps = {
  width: 60,
  height: 60,
}

Loader.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}