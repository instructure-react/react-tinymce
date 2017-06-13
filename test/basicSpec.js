const domify = require('domify');
const TestContainer = require('mocha-test-container-support');

describe('basic test with global tinymce', () => {

  var testContainer;

  beforeEach( function () {
    testContainer = TestContainer.get(this);
  });


  it('should be defined', () => {

    // when
    var tm = global.tinymce

    // then
    expect(tm).to.be.not.undefined
  });


  it('should tinymceify textarea', () => {

    // given
    testContainer.appendChild(document.createElement('textarea'));

    // when
    tinymce.init({ selector: 'textarea' });

    // then
    expect(testContainer.childNodes[0].className).to.include('mce-tinymce');
  });


  it('should tinymceify textarea inline', () => {

    // given
    const div = domify('<div id="inline">Hello World</div>')
    testContainer.appendChild(div);

    // when
    tinymce.init({ selector: '#inline', inline: true });

    // then
    expect(div.contentEditable).to.equal('true');
    expect(div.innerHTML).to.equal('<p>Hello World</p>');
  });

});
