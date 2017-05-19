import React, { Component } from 'react'
import {render} from 'react-dom'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import Pagination from '../../src'
import reducers from './reducers';

class Demo extends Component {
  render() {
    return <div>
      <h1>kk-react-pagination Demo</h1>
      <Pagination name="test">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </Pagination>
    </div>
  }
}

const createStoreWithMiddleware = applyMiddleware()(createStore);
export const store = createStoreWithMiddleware(
  reducers,
  // eslint-disable-next-line
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

render(
    <Provider store={store}>
      <Demo/>
    </Provider>,
    document.getElementById('demo'),
  );
