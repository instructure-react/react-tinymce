var React = require('react');
var DOM = React.DOM;
var isEqual = require('lodash/lang/isEqual');
var uuid = require('../helpers/uuid');
var uc_first = require('../helpers/uc_first');

// Include all of the Native DOM and custom events from:
// https://github.com/tinymce/tinymce/blob/master/tools/docs/tinymce.Editor.js#L5-L12
var EVENTS = [
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
var HANDLER_NAMES = EVENTS.map(function(event) {
  return 'on' + uc_first(event);
});

var TinyMCE = React.createClass({
  displayName: 'TinyMCE',

  propTypes: {
    config: React.PropTypes.object,
    content: React.PropTypes.string,
  },

  getDefaultProps: function () {
    return {
      config: {},
      content: ''
    };
  },

  componentWillMount: function () {
    this.id = this.id || uuid();
  },

  componentDidMount: function () {
    this._init(this.props.config);
  },

  componentWillUnmount: function () {
    this._remove();
  },

  componentWillReceiveProps: function (nextProps) {
    if (!isEqual(this.props.config, nextProps.config)) {
      this._init(nextProps.config, nextProps.content);
    }
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    return (
      !isEqual(this.props.content, nextProps.content) ||
      !isEqual(this.props.config, nextProps.config)
    );
  },

  _init: function (config, content) {
    if (this._isInit) {
      this._remove();
    }

    var self = this;
    config.selector = '#' + this.id;
    config.setup = function (editor) {
      EVENTS.forEach(function (event, index) {
        var handler = self.props[HANDLER_NAMES[index]];
        if (typeof handler !== 'function') return;
        editor.on(event, function(e) {
          // native DOM events don't have access to the editor so we pass it here
          handler(e, editor);
        });
      });
      // need to set content here because the textarea will still have the
      // old `this.props.content`
      if (content) {
        editor.on('init', function() {
          editor.setContent(content);
        });
      }
    };

    tinymce.init(config);
    this._isInit = true;
  },

  _remove: function () {
    tinymce.EditorManager.execCommand("mceRemoveEditor", true, this.id);
    this._isInit = false;
  },

  render: function () {
    return DOM.textarea({
      id: this.id,
      defaultValue: this.props.content
    });
  }
});

//add handler propTypes
HANDLER_NAMES.forEach(function (name) {
  TinyMCE.propTypes[name] = React.PropTypes.func;
});

module.exports = TinyMCE;
