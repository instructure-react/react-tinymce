import React from 'react';
import TinyMCE from '../../lib/main';

const STYLES = {
  container: {
    fontFamily: 'Helvetica Neue, sans-serif',
    padding: '0 25px'
  },
  output: {
    border: '1px solid #999',
    borderRadius: 5,
    fontFamily: 'Courier New, monospace',
    padding: 10,
    height: 250,
    overflow: 'auto'
  }
};

const App = React.createClass({
  getInitialState() {
    return {
      content: '<p><strong>Welcome to react-tinymce</strong></p>'
    };
  },

  handleEditorChange(e) {
    this.setState({
      content: e.target.getContent()
    });
  },

  render() {
    return (
      <div style={STYLES.container}>
        <h1>react-tinymce</h1>
        <TinyMCE
          content={this.state.content}
          onChange={this.handleEditorChange}
        />
        <br/>
        <strong>Output</strong>
        <pre style={STYLES.output}>{this.state.content}</pre>
      </div>
    );
  }
});

React.render(<App/>, document.getElementById('example'));
