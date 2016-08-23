# react-tinymce-editor

React TinyMCE Editor component

## Installing

```bash
$ npm install react-tinymce
```

## Demo

http://abhirathore2006.github.io/react-tinymce-editor/

## Example

```js
import React from 'react';
import ReactDOM from 'react-dom';
import TinyMCE from 'react-tinymce-editor';

const App = React.createClass({
  handleEditorChange(e) {
    console.log(e.target.getContent());
  },

  render() {
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

ReactDOM.render(<App/>, document.getElementById('container'));
```
## Note :  

Do not use handler like this.someFunc.bind(this), this will result props compare to fail and it reset on every change.
Solution: Bind the func to this in constructor and just use this.someFunc in handler

## Dependency

This component depends on `tinymce` being globally accessible.

```html
<script src="//tinymce.cachefly.net/4.2/tinymce.min.js"></script>
```

## Contributing

install your dependencies:

`npm install`

rackt-cli depends on a version of babel-eslint that will not run successfully with
the rest of this project.  Until an upgrade is available, after installing,
edit "node_modules/rackt-cli/package.json"
and update it's babel-eslint to at least 4.1.7. Then `npm install` in the rackt
directory, and return to project root.  From here on you need to use the
rackt version in node modules, so either alias "rackt" to it's bin, or
just path each command into node_modules/.bin like below.

To make sure the linter is happy and the functional tests run, execute:

`./node_modules/.bin/rackt test`

To release, you'll need to be an npm owner for react-tinymce-editor, and already
have your machine currently authed with `npm adduser`

https://docs.npmjs.com/cli/adduser

use `./node_modules/.bin/rackt release`

## License

MIT
