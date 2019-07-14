import React from 'react';
import PropTypes from 'prop-types';

export class Code extends React.Component {
  componentDidMount() {
    Prism.highlightAll();
  }

  componentDidUpdate() {
    Prism.highlightAll();
  }

  render() {
    const { snippet } = this.props;
    const match = (/#([^#]*)#/.exec(snippet) || {})[1] || false;

    return match ? (
      <pre data-line={match}>
        <code className="language-javascript">
          {`${snippet.replace(/#.*\W*/, '')}`}
        </code>
      </pre>
    ) : (
      <pre>
        <code className="language-javascript">
          {`${snippet.replace(/#.*\W*/, '')}`}
        </code>
      </pre>
    );
  }
};

Code.propTypes = {
  snippet: PropTypes.string.isRequired,
};
