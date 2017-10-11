import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import isEqual from 'lodash/isEqual';
import clone from 'lodash/clone';
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
  'PostProcess', 'focus', 'blur', 'dirty'
];

// Note: because the capitalization of the events is weird, we're going to get
// some inconsistently-named handlers, for example compare:
// 'onMouseleave' and 'onNodeChange'
const HANDLER_NAMES = EVENTS.map((event) => {
  return 'on' + ucFirst(event);
});

const TinyMCE = createReactClass({
  displayName: 'TinyMCE',

  propTypes: {
    config: PropTypes.object,
    content: PropTypes.string,
    id: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string
  },

  getDefaultProps() {
    return {
      config: {},
      content: ''
    };
  },

  componentWillMount() {
    this.id = this.id || this.props.id || uuid();
  },

  componentDidMount() {
    const config = clone(this.props.config);
    this._init(config, this.props.content);
  },

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.config, nextProps.config) || !isEqual(this.props.id, nextProps.id)) {
      this.id = nextProps.id;
      this._init(clone(nextProps.config), nextProps.content);
      return;
    }

    // TODO: This will fix problems with keeping internal state, but causes problems with cursor placement
    // if (!isEqual(this.props.content, nextProps.content)) {
    //   const editor = tinymce.EditorManager.get(this.id);
    //   editor.setContent(nextProps.content);
    //
    //   editor.selection.select(editor.getBody(), true);
    //   editor.selection.collapse(false);
    // }
  },

  shouldComponentUpdate(nextProps) {
    return (
      !isEqual(this.props.config, nextProps.config)
    );
  },

  componentWillUnmount() {
    this._remove();
  },

  render() {
    return this.props.config.inline ? (
      <div
        id={this.id}
        className={this.props.className}
        dangerouslySetInnerHTML={{__html: this.props.content}}
      />
    ) : (
      <textarea
        id={this.id}
        className={this.props.className}
        name={this.props.name}
        defaultValue={this.props.content}
      />
    );
  },

  _init(config, content) {
    if (this._isInit) {
      this._remove();
    }

    // hide the textarea that is me so that no one sees it
    findDOMNode(this).style.hidden = 'hidden';

    const setupCallback = config.setup;
    const hasSetupCallback = (typeof setupCallback === 'function');

    config.selector = '#' + this.id;
    config.setup = (editor) => {
      EVENTS.forEach((eventType, index) => {
        editor.on(eventType, (e) => {
          const handler = this.props[HANDLER_NAMES[index]];
          if (typeof handler === 'function') {
            // native DOM events don't have access to the editor so we pass it here
            handler(e, editor);
          }
        });
      });
      // need to set content here because the textarea will still have the
      // old `this.props.content`
      if (typeof content !== 'undefined') {
        editor.on('init', () => {
          editor.setContent(content);
        });
      }
      if (hasSetupCallback) {
        setupCallback(editor);
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
  TinyMCE.propTypes[name] = PropTypes.func;
});

module.exports = TinyMCE;
