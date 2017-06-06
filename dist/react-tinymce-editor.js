(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactTinymceEditor"] = factory(require("react"));
	else
		root["ReactTinymceEditor"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _lodash = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"lodash\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _helpersUuid = __webpack_require__(3);
	
	var _helpersUuid2 = _interopRequireDefault(_helpersUuid);
	
	var _helpersUcFirst = __webpack_require__(4);
	
	var _helpersUcFirst2 = _interopRequireDefault(_helpersUcFirst);
	
	// Include all of the Native DOM and custom events from:
	// https://github.com/tinymce/tinymce/blob/master/tools/docs/tinymce.Editor.js#L5-L12
	var EVENTS = ['focusin', 'focusout', 'click', 'dblclick', 'mousedown', 'mouseup', 'mousemove', 'mouseover', 'beforepaste', 'paste', 'cut', 'copy', 'selectionchange', 'mouseout', 'mouseenter', 'mouseleave', 'keydown', 'keypress', 'keyup', 'contextmenu', 'dragend', 'dragover', 'draggesture', 'dragdrop', 'drop', 'drag', 'BeforeRenderUI', 'SetAttrib', 'PreInit', 'PostRender', 'init', 'deactivate', 'activate', 'NodeChange', 'BeforeExecCommand', 'ExecCommand', 'show', 'hide', 'ProgressState', 'LoadContent', 'SaveContent', 'BeforeSetContent', 'SetContent', 'BeforeGetContent', 'GetContent', 'VisualAid', 'remove', 'submit', 'reset', 'BeforeAddUndo', 'AddUndo', 'change', 'undo', 'redo', 'ClearUndos', 'ObjectSelected', 'ObjectResizeStart', 'ObjectResized', 'PreProcess', 'PostProcess', 'focus', 'blur', 'dirty'];
	
	// Note: because the capitalization of the events is weird, we're going to get
	// some inconsistently-named handlers, for example compare:
	// 'onMouseleave' and 'onNodeChange'
	var HANDLER_NAMES = EVENTS.map(function (event) {
	  return 'on' + (0, _helpersUcFirst2['default'])(event);
	});
	
	var TinyMCE = _react2['default'].createClass({
	  displayName: 'TinyMCE',
	
	  propTypes: {
	    config: _react2['default'].PropTypes.object,
	    content: _react2['default'].PropTypes.string,
	    id: _react2['default'].PropTypes.string,
	    className: _react2['default'].PropTypes.string,
	    reset: _react2['default'].PropTypes.number
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      config: {},
	      content: ''
	    };
	  },
	
	  componentWillMount: function componentWillMount() {
	    this.id = this.id || this.props.id || (0, _helpersUuid2['default'])();
	  },
	
	  componentDidMount: function componentDidMount() {
	    var config = (0, _lodash.clone)(this.props.config);
	    var content = (0, _lodash.clone)(this.props.content || '');
	    this._init(config, content, this.id);
	  },
	  _getPropData: function _getPropData(props) {
	    var content = props.content;
	    var config = props.config;
	
	    var partialprops = _objectWithoutProperties(props, ['content', 'config']);
	
	    this.content = content;
	    this.config1 = config;
	    return partialprops;
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (!(0, _lodash.isEqual)(this._getPropData(nextProps), this._getPropData(this.props))) {
	      this._init(nextProps.config, nextProps.content, nextProps.id || this.id);
	    }
	  },
	
	  shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
	    if ((0, _lodash.isEqual)(this._getPropData(nextProps), this._getPropData(this.props)) && this.props.content !== nextProps.content && (this._isInit !== undefined && this._isInit === true)) {
	      this.editor.setContent(nextProps.content);
	    }
	    return !(0, _lodash.isEqual)(this._getPropData(nextProps), this._getPropData(this.props));
	  },
	
	  componentWillUnmount: function componentWillUnmount() {
	    this._remove(this.id);
	  },
	
	  render: function render() {
	    return this.props.config.inline ? _react2['default'].createElement('div', {
	      id: this.id,
	      className: this.props.className,
	      dangerouslySetInnerHTML: { __html: this.props.content }
	    }) : _react2['default'].createElement('textarea', {
	      id: this.id,
	      className: this.props.className,
	      value: this.props.content
	    });
	  },
	
	  _init: function _init(config, content, id) {
	    var _this = this;
	
	    setTimeout(function () {
	      var oldId = _this.id;
	      _this.id = id;
	
	      var setupCallback = config.setup;
	      var hasSetupCallback = typeof setupCallback === 'function';
	      config.selector = '#' + _this.id;
	      config.setup = function (editor) {
	        _this.editor = editor;
	        EVENTS.forEach(function (event, index) {
	          var handler = _this.props[HANDLER_NAMES[index]];
	          if (typeof handler !== 'function') return;
	          editor.on(event, function (e) {
	            // native DOM events don't have access to the editor so we pass it here
	            handler(e, editor);
	          });
	        });
	        // need to set content here because the textarea will still have the
	        // old `this.props.content`
	        if (content) {
	          editor.on('init', function () {
	            editor.setContent(content);
	          });
	        }
	        if (hasSetupCallback) {
	          setupCallback(editor);
	        }
	      };
	      if (_this._isInit) {
	        _this._remove(oldId);
	      }
	      tinymce.init(config);
	      _this._isInit = true;
	    }, 5);
	  },
	
	  _remove: function _remove(id) {
	    tinymce.EditorManager.execCommand('mceRemoveEditor', false, id);
	    this._isInit = false;
	  }
	});
	
	// add handler propTypes
	HANDLER_NAMES.forEach(function (name) {
	  TinyMCE.propTypes[name] = _react2['default'].PropTypes.func;
	});
	
	module.exports = TinyMCE;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	var count = 0;
	module.exports = function uuid() {
	  return 'react-tinymce-' + count++;
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = ucFirst;
	
	function ucFirst(str) {
	  return str[0].toUpperCase() + str.substring(1);
	}
	
	module.exports = exports["default"];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=react-tinymce-editor.js.map