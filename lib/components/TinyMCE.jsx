var React = require('react');
var uuid = require('../helpers/uuid');
var uc_first = require('../helpers/uc_first');

var EVENTS = [
  'activate', 'blur', 'change', 'deactivate', 'focus', 'hide',
  'init', 'redo', 'remove', 'reset', 'show', 'submit', 'undo'
];

module.exports = React.createClass({
  displayName: 'TinyMCE',

  propTypes: {
    config: React.PropTypes.object,
    content: React.PropTypes.string,

    onActivate: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onDeactivate: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onHide: React.PropTypes.func,
    onInit: React.PropTypes.func,
    onRedo: React.PropTypes.func,
    onRemove: React.PropTypes.func,
    onReset: React.PropTypes.func,
    onShow: React.PropTypes.func,
    onSubmit: React.PropTypes.func,
    onUndo: React.PropTypes.func
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
    var self = this;
    this.props.config.selector = '#' + this.id;
    this.props.config.setup = function (editor) {
      EVENTS.forEach(function (event) {
        editor.on(event, function (e) {
          var handler = self.props['on' + uc_first(event)];
          if (typeof handler === 'function') {
            handler(e);
          }
        });
      });
    };

    tinymce.init(this.props.config);

    setTimeout(function () {
      tinymce.get(this.id).setContent(this.props.content);
    }.bind(this), 0);
  },

  componentWillUnmount: function () {
    tinymce.remove(this.id);
  },

  componentWillReceiveProps: function(nextProps) {
    if (this.props.content !== nextProps.content) {
      setTimeout(function () {
        tinymce.get(this.id).setContent(nextProps.content);
      }.bind(this), 0);
    }
  },

  render: function () {
    return <textarea ref="text" id={this.id}></textarea>;
  }
});
