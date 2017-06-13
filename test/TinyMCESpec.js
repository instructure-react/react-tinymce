import React from 'react';
import ReactDOM from 'react-dom';

import domify from 'domify';
import TestContainer from 'mocha-test-container-support';

import TinyMCE from '../';

describe('TinyMCE component tests', () => {

  var testContainer;

  beforeEach( function () {
    testContainer = TestContainer.get(this);
  });


  it('should render TinyMCE Component', () => {

    ReactDOM.render(<TinyMCE config={{}} />, testContainer);
  });


  it('should render TinyMCE Component inline', () => {

    var div = document.createElement('div');
    testContainer.appendChild(div);

    ReactDOM.render(
      <TinyMCE config={{ inline: true }} content="<strong>Hello World</strong>"/>,
      div
    );
  });


});
