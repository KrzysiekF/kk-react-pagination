import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import Prism from 'prismjs';
import 'prismjs/themes/prism-coy.css';
import 'normalize.css';
import 'gridlex/docs/gridlex.min.css';

import Pagination from '../../src';
import reducers from './reducers';

import '../../src/assets/style.css';
import '../../src/assets/template/simple.css';

import './style.css';


class Demo extends Component {
  renderDemoList(elementsNumber = 10) {
    let count = 0;
    const list = [];

    do {
      list.push(<div className="list-element"><span>{count + 1}.</span> Lorem ipsum dolor...</div>);
      count++;
    } while (count < elementsNumber);

    return list;
  }

  render() {
    Prism.highlightAll();

    return (
      <div>
        <div className="content">
          <h1 className="logo">KK React Pagination</h1>

          <section>
            <h2>Installation / Download</h2>

            <h3>NPM</h3>
            <pre>
              <code className="language-bash">
              npm install --save kk-react-pagination
            </code>
            </pre>
          </section>

          <section>
            <h2>Examples</h2>

            <h3>Simple</h3>
            <div className="grid">
              <div className="col-8">
                <Pagination
                  name="demo1"
                  // prevLabel="&laquo;"
                  // nextLabel="&raquo;"
                >
                  {this.renderDemoList()}
                </Pagination>
              </div>
              <div className="col">
                <pre>
                  <code className="language-javascript">
                    {`<Pagination
  name="demo1"
>(...)</Pagination>`}
                  </code>
                </pre>
              </div>
            </div>

            <h3>Options</h3>
            <div className="grid">
              <div className="col-8">
                <Pagination
                  name="demo2"
                  pageSize={2}
                  startPage={2}
                  align="left"
                  prevLabel="&laquo;"
                  nextLabel="&raquo;"
                >
                  {this.renderDemoList()}
                </Pagination>
              </div>
              <div className="col">
                <pre>
                  <code className="language-javascript">
                    {`<Pagination
  name="demo2"
  pageSize={2}
  startPage={2}
  align="left"
  prevLabel="&laquo;"
  nextLabel="&raquo;"
>(...)</Pagination>`}
                  </code>
                </pre>
              </div>
            </div>
          </section>

          <section>
            <h2>Options</h2>
            <table className="table">
              <tr>
                <th>option</th>
                <th>default</th>
                <th>description</th>
              </tr>
              <tr>
                <td><code>name</code></td>
                <td><code>''</code> (<code>string</code>)</td>
                <td />
              </tr>
              <tr>
                <td><code>pageSize</code></td>
                <td><code>5</code> (<code>number</code>)</td>
                <td />
              </tr>
              <tr>
                <td><code>startPage</code></td>
                <td><code>1</code> (<code>number</code>)</td>
                <td />
              </tr>
              <tr>
                <td><code>prevLabel</code></td>
                <td><code>prev</code> (<code>string</code>)</td>
                <td />
              </tr>
              <tr>
                <td><code>nextLabel</code></td>
                <td><code>next</code> (<code>string</code>)</td>
                <td />
              </tr>
              <tr>
                <td><code>align</code></td>
                <td><code>center</code> (<code>string</code>)</td>
                <td>
                  <code>left</code> || <code>center</code> || <code>right</code>
                </td>
              </tr>
            </table>
          </section>

          <footer>
            <a href="http://krzysztof-furtak.pl" target="_blank">Krzysztof
                Furtak</a> &copy; copyright 2017
            </footer>
        </div>
      </div>);
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
    <Demo />
  </Provider>,
    document.getElementById('demo'),
);
