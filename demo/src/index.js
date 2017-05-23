import React, { Component } from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import Pagination from "../../src";
import reducers from "./reducers";

import Normalize from "normalize.css";
import "./style.css";

import Prism from "prismjs";
import "prismjs/themes/prism-coy.css";

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

          <Pagination name="test">
            {this.renderDemoList()}
          </Pagination>
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
              <td></td>
            </tr>
            <tr>
              <td><code>pageSize</code></td>
              <td><code>5</code> (<code>number</code>)</td>
              <td></td>
            </tr>
            <tr>
              <td><code>startPage</code></td>
              <td><code>1</code> (<code>number</code>)</td>
              <td></td>
            </tr>
          </table>
        </section>

        <footer>
          <a href="http://krzysztof-furtak.pl" target="_blank">Krzysztof Furtak</a> &copy; copyright 2017
        </footer>
      </div>
    </div>);
  }
}

const createStoreWithMiddleware = applyMiddleware()(createStore);
export const store = createStoreWithMiddleware(
  reducers,
  // eslint-disable-next-line
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

render(
  <Provider store={store}>
    <Demo />
  </Provider>,
  document.getElementById("demo")
);
