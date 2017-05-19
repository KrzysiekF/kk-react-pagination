import expect from 'expect'
import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'
import { createStore, applyMiddleware } from 'redux';
import reducers from 'src/reducers';

import Component from 'src/'

describe('Component', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('displays a welcome message', () => {
    const createStoreWithMiddleware = applyMiddleware()(createStore);
    const store = createStoreWithMiddleware(
      reducers,
    );

    render(<Component store={store} />, node, () => {
      expect(node.innerHTML).not.toEqual()
    })
  })
})
