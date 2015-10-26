import React from 'react';
import { findDOMNode } from 'react-dom';
import isEqual from 'lodash/lang/isEqual';
import uuid from '../helpers/uuid';
import ucFirst from '../helpers/ucFirst';

// Include all of the Native DOM and custom events from:
// https://github.com/tinymce/tinymce/blob/master/tools/docs/tinymce.Editor.js#L5-L12
const EVENTS = [
  'focusin', 'focusout', 'click', 'dblclick', 'mousedown', 'mouseup',
  'mousemove', 'mouseover', 'beforepaste', 'paste', 'cut', 'copy',
  'selectionchange', 'mouseout', 'mouseenter', 'mouseleave', 'keydown',
  'keypress', 'keyup', 'contextmenu', 'dragend', 'dragover', 'draggesture',
  'dragdrop', 'drop', 'drag', 'BeforeRenderUI', 'SetAttrib', 'PreInit',
  'PostRender', 'init', 'deactivate', 'activate', 'NodeChange',
  'BeforeExecCommand', 'ExecCommand', 'show', 'hide', 'ProgressState',
  'LoadContent', 'SaveContent', 'BeforeSetContent', 'SetContent',
  'BeforeGetContent', 'GetContent', 'VisualAid', 'remove', 'submit', 'reset',
  'BeforeAddUndo', 'AddUndo', 'change', 'undo', 'redo', 'ClearUndos',
  'ObjectSelected', 'ObjectResizeStart', 'ObjectResized', 'PreProcess',
  'PostProcess', 'focus', 'blur'
];

// Note: because the capitalization of the events is weird, we're going to get
// some inconsistently-named handlers, for example compare:
// 'onMouseleave' and 'onNodeChange'
const HANDLER_NAMES = EVENTS.map((event) => {
  return 'on' + ucFirst(event);
});

const TinyMCE = React.createClass({
  displayName: 'TinyMCE',

  propTypes: {
    config: React.PropTypes.object,
    content: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      config: {},
      content: ''
    };
  },

  componentWillMount() {
    this.id = this.id || uuid();
  },

  componentDidMount() {
    this._init(this.props.config);
  },

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.config, nextProps.config)) {
      this._init(nextProps.config, nextProps.content);
    }
  },

  shouldComponentUpdate(nextProps) {
    return (
      !isEqual(this.props.content, nextProps.content) ||
      !isEqual(this.props.config, nextProps.config)
    );
  },

  componentWillUnmount() {
    this._remove();
  },

  render() {
    if (this.props.config.inline) {
      return (
        <div
          id={this.id}
          dangerouslySetInnerHTML={ {__html: this.props.content} }
        />
      );
    } else {
      return (
        <textarea
          id={this.id}
          defaultValue={this.props.content}
        />
      );
    }
  },

  _init(config, content) {
    if (this._isInit) {
      this._remove();
    }

    // hide the textarea that is me so that no one sees it
    findDOMNode(this).style.hidden = 'hidden';

    config.selector = '#' + this.id;
    config.setup = (editor) => {
      EVENTS.forEach((event, index) => {
        const handler = this.props[HANDLER_NAMES[index]];
        if (typeof handler !== 'function') return;
        editor.on(event, (e) => {
          // native DOM events don't have access to the editor so we pass it here
          handler(e, editor);
        });
      });
      // need to set content here because the textarea will still have the
      // old `this.props.content`
      if (content) {
        editor.on('init', () => {
          editor.setContent(content);
        });
      }
    };

    tinymce.init(config);

    findDOMNode(this).style.hidden = '';

    this._isInit = true;
  },

  _remove() {
    tinymce.EditorManager.execCommand('mceRemoveEditor', true, this.id);
    this._isInit = false;
  }
});

// add handler propTypes
HANDLER_NAMES.forEach((name) => {
  TinyMCE.propTypes[name] = React.PropTypes.func;
});

module.exports = TinyMCE;
