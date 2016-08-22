import React from 'react';
import isEqual from 'lodash/lang/isEqual';
import clone from 'lodash/lang/clone';
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

const TinyMCE = React.createClass({
  displayName: 'TinyMCE',

  propTypes: {
    config: React.PropTypes.object,
    content: React.PropTypes.string,
    id: React.PropTypes.string,
    className: React.PropTypes.string
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
    const config  = clone(this.props.config);
    const content = clone( this.props.content || '' );
    this._init(config, content, this.id);
  },
  _getPropData(props) {
    const {content, ...partialprops} = props;
    this.content = content;
    return partialprops;
  },
  componentWillReceiveProps(nextProps) {
    if (!isEqual(this._getPropData(nextProps), this._getPropData(this.props))) {
      this._init(nextProps.config, nextProps.content, ( nextProps.id || this.id ));
    }
  },

  shouldComponentUpdate(nextProps) {
    return (
      !isEqual(this.props.content, nextProps.content) ||
      !isEqual(this.props.config, nextProps.config)
    );
  },

  componentWillUnmount() {
    this._remove(this.id);
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
        defaultValue={this.props.content}
      />
    );
  },

  _init(config, content, id) {
    if (this._isInit) {
      this._remove(this.id);
    }
    this.id = id;
    // hide the textarea that is me so that no one sees it
    if (document.getElementById(this.id)) {
      document.getElementById(this.id).style.hidden = 'hidden';
    }

    const setupCallback = config.setup;
    const hasSetupCallback = (typeof setupCallback === 'function');

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
        //  setTimeout(()=>{
          editor.setContent(content);
        //  }, 100);
        });
      }
      if (hasSetupCallback) {
        setupCallback(editor);
      }
    };

    tinymce.init(config);

    if (document.getElementById(this.id)) {
      document.getElementById(this.id).style.hidden = '';
    }

    this._isInit = true;
  },

  _remove(id) {
    tinymce.EditorManager.execCommand('mceRemoveControl', true, id);
    this._isInit = false;
  }
});

// add handler propTypes
HANDLER_NAMES.forEach((name) => {
  TinyMCE.propTypes[name] = React.PropTypes.func;
});

module.exports = TinyMCE;
