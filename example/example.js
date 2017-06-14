import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TinyMCE from '../'; // 'react-mce'

class Example extends Component {

  _onChangeTextarea(e) {
    console.log(e.target.getContent());
  }

  render() {
    return (
      <div>
        <div>
          <h3>TinyMCE Textarea</h3>

          <TinyMCE
            content="Hello"
            config={{
              plugins: 'autolink link image lists print preview',
              toolbar: 'undo redo | bold italic | alignleft aligncenter alignright'
            }}
            onChange={this._onChangeTextarea}
          />

        </div>
        <div>
          <h3>TinyMCE Inline</h3>

          <TinyMCE
            config={{ inline: true }}
            content="Click here!"
          />

        </div>
      </div>
    );
  }
}

ReactDOM.render(<Example />, document.getElementById('root'));
