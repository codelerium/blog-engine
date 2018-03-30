import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './styles.css';

export class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.handleKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  onKeyDown(e) {
    if (e.ctrlKey && e.keyCode === 71) {
      e.preventDefault();
      this.setState({ visible: !this.state.visible });
    }
  }

  render() {
    return (
      <div style={{
        ...s.GRID_WRAPPER,
        opacity: this.state.visible ? 0.1 : 0,
        width: (this.props.columnWidth * this.props.columnNumber) +
        (this.props.gutterWidth * (this.props.columnNumber - 1)),
      }}>
        {
          Array.from({ length: this.props.columnNumber }).map((grid, i) => (
            <div key={i} style={{...s.GRID_ITEM, flex: `0 0 ${this.props.columnWidth}px`}} />
          ))
        }
      </div>
    );
  }
}

Grid.propTypes = {
  columnWidth: PropTypes.number.isRequired,
  columnNumber: PropTypes.number.isRequired,
  gutterWidth: PropTypes.number.isRequired,
};
