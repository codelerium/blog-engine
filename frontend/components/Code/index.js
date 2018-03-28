import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highlight from 'react-highlight';

export default class Code extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Highlight innerHtml className="javascript" >
        {this.props.snippet}
      </Highlight>
    );
  }
}

Code.propTypes = {
  snippet: PropTypes.string.isRequired,
};
