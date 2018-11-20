import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import 'prismjs/themes/prism-coy.css';
import 'normalize.css';
import 'gridlex/docs/gridlex.min.css';

import reducers from './reducers';

import '../../src/assets/style.css';
import '../../src/assets/templates/simple.css';

import './style.css';
import Demo from './demo';

const createStoreWithMiddleware = applyMiddleware()(createStore);
export const store = createStoreWithMiddleware(
    reducers,
    // eslint-disable-next-line
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
);

render(
  <Provider store={store}>
    <Demo />
  </Provider>,
    document.getElementById('demo'),
);
