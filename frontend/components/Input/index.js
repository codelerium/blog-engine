import React from 'react';
import PropTypes from 'prop-types';
import s from './style.less';

export const Input = props => (
  <div>
    <input className={`${props.hasErr ? s.error : ''} ${s.input}`}
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
      type={props.type || 'text'}
    />
    {
      props.hasErr && (
        <p className={s.inputError}>
          {props.errMsg}
        </p>
      )
    }
  </div>
);

Input.defaultProps = {
  hasErr: false,
  errMsg: '',
}

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  hasErr: PropTypes.bool,
  errMsg: PropTypes.string,
};
