import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from './reducers'

import Pagination from './index'

const createStoreWithMiddleware = applyMiddleware()(createStore)
export const store = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <Provider store={store}>
    <Pagination name="demo1">
        <div>ok 1</div>
        <div>ok 2</div>
    </Pagination>
  </Provider>,
  document.getElementById('app')
);
