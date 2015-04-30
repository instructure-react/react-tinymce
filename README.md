# react-tinymce

React TinyMCE component

## Installing

```bash
$ npm install react-tinymce
```

## Demo

http://mzabriskie.github.io/react-tinymce/example/

## Example

```js
var React = require('react');
var TinyMCE = require('react-tinymce');

var App = React.createClass({
  handleEditorChange: function (e) {
    console.log(e.target.getContent());
  },

  render: function () {
    return (
      <TinyMCE
        content="<p>This is the initial content of the editor</p>"
        config={{
          plugins: 'autolink link image lists print preview',
          toolbar: 'undo redo | bold italic | alignleft aligncenter alignright'
        }}
        onChange={this.handleEditorChange}
      />
    );
  }
});

React.render(<App/>, document.getElementById('container'));
```

## License

MIT
