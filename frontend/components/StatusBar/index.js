import React from 'react';
import PropTypes from 'prop-types';
import s from './styles.css';

export const StatusBar = (props) => (
    <div style={s.STATUSBAR_WRAPPER}>
        <div style={{
            ...s.STATUSBAR,
            width: `${props.progress}%`,
        }}/>
    </div>
)

StatusBar.propTypes = {
    progress: PropTypes.number.isRequired,
}
