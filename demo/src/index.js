import React, { Component } from 'react'
import {render} from 'react-dom'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import Pagination from '../../src'
import reducers from './reducers';

class Demo extends Component {

  renderDemoList(elementsNumber = 10) {
    let count = 0;
    let list = [];

    do {
      list.push(<div>{count + 1}</div>);
      count++;
    } while (count < elementsNumber);

    return list;
  }

  render() {
    return <div>
      <h1>kk-react-pagination demo</h1>
      <Pagination name="test">
        {this.renderDemoList()}
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
