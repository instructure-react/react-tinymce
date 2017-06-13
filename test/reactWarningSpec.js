
describe('createClass/PropTypes Error', () => {

  var warn;

  before(() => {
    // let console.warn throw an error
    warn = console.warn;
    console.warn = (msg) => { throw new Error(msg);
  }});

  after(() => console.warn = warn);


  it('should throw PropTypes Warning', () => {

    expect(() => {

      // when
      var BadPropTypesTest = require('./fixtures/badPropTypes');
    })

    // then
    .to.throw(/^Warning: Accessing PropTypes via the main React/);

  });


  it('should throw createClass Warning', () => {

    expect(() => {

      // when
      var BadPropTypesTest = require('./fixtures/badCreateClass');
    })

    // then
    .to.throw(/^Warning: Accessing createClass via the main React/);

  });


  it('should should not throw creatClass or PropTypes Warning', () => {

    expect(() => {

      // when
      var TinyMCE = require('../')
    })

    // then
    .to.not.throw();
  });

});
