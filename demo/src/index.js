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
import '../../src/assets/templates/simple.css';

import './style.css';

class Demo extends Component {
  renderDemoList(elementsNumber = 10) {
    let count = 0;
    const list = [];

    do {
      list.push(<div
        className="list-element" data-pagination-id={count + 1}
        key={count + 1}
      ><span>{count + 1}.</span> Lorem ipsum
        dolor...</div>);
      count++;
    } while (count < elementsNumber);

    return list;
  }

  renderBigDataDemo(elementsNumber = 10) {
    let count = 0;
    const pickupPoints = [];
    const primaryPointID = null;
    const selectedPickupPoint = { id: 90 };
    const deliveryType = { logisticType: 'xxx' };

    do {
      pickupPoints.push({
        id: count,
        symbol: 'BAB01N',
        name: 'BAB01N',
        street: 'Wolsztyska 1',
        city: 'Babimost',
        postCode: '66-110',
        country: 'PL',
        region: null,
        description: 'Przy markecie POLOmarket',
        latitude: 52.16529,
        longitude: 15.83818,
        logisticType: 4,
      });
      count++;
    } while (count < elementsNumber);

    const html = pickupPoints.map((pickupPoint) => {
      if (primaryPointID && primaryPointID === pickupPoint.id) {
        return null;
      }

      return (
        <div
          className="pickup-points-list-element"
          data-pagination-id={pickupPoint.id}
          key={pickupPoint.id}
        >
          <label
            data-point-id={pickupPoint.id}
            htmlFor={`nf-marker-pickuppoint-id-${pickupPoint.id}`}
          >
            <input
              type="radio"
              name="point_primary"
              id={`nf-marker-pickuppoint-id-${pickupPoint.id}`}
              onChange={() => {}}
              checked={
                    selectedPickupPoint &&
                    selectedPickupPoint.id === pickupPoint.id
                  }
            />
            <div className={`point-${deliveryType.logisticType}`}>
              <div>
                {pickupPoint.id} - <strong>{pickupPoint.symbol}</strong>
              </div>
              <div>
                {`${pickupPoint.street}, ${pickupPoint.postCode} ${pickupPoint.city}`}
              </div>
            </div>
          </label>
        </div>
      );
    });

    return html;
  }

  render() {
    Prism.highlightAll();

    return (
      <div>
        <Pagination name="pickupPoints" openPageByElementId={94} onePageHide prevLabel="&laquo;" nextLabel="&raquo;">
          {this.renderBigDataDemo(1000)}
        </Pagination>

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
                <Pagination name="demo1">
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

            <h3>Open page by element ID</h3>
            <div style={{ margin: '0 0 0 13px' }}>ID:</div>
            <div className="grid">
              <div className="col-8">
                <Pagination
                  name="demo3"
                  pageSize={3}
                  openPageByElementId={9}
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
  name="demo3"
  pageSize={3}
  openPageByElementId={9}
  prevLabel="&laquo;"
  nextLabel="&raquo;"
>(...)</Pagination>`}
                  </code>
                </pre>
                <div>Element:</div>
                <pre>
                  <code className="language-html">
                    {`<div
    className="list-element"
    data-pagination-id={9}>
    9. Lorem ipsum...
 </div>`}
                  </code>
                </pre>
              </div>
            </div>

            <h3>Many pages</h3>
            <div className="grid">
              <div className="col-8">
                <Pagination
                  name="demo4"
                  displayedPages={3}
                >
                  {this.renderDemoList(100)}
                </Pagination>
              </div>
              <div className="col">
                <pre>
                  <code className="language-javascript">
                    {`<Pagination
  name="demo4"
  displayedPages={3}
>(...)</Pagination>`}
                  </code>
                </pre>
              </div>
            </div>
          </section>

          <section>
            <h2>Options</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>option</th>
                  <th>default</th>
                  <th>description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>name</code></td>
                  <td><code>''</code> (<code>string</code>)(required)</td>
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
                    <code>left</code> || <code>center</code> ||
                    <code>right</code>
                  </td>
                </tr>
                <tr>
                  <td><code>onePageHide</code></td>
                  <td><code>false</code> (<code>bool</code>)</td>
                  <td>
                    Hide pagination when is only one page.
                  </td>
                </tr>
                <tr>
                  <td><code>openPageByElementId</code></td>
                  <td><code>0</code> (<code>number</code>)</td>
                  <td>
                    Must be unique.
                  </td>
                </tr>
                <tr>
                  <td><code>displayedPages</code></td>
                  <td><code>5</code> (<code>number</code>)</td>
                  <td>
                    How many page numbers should be visible while navigating.
                  </td>
                </tr>
              </tbody>
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
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
);

render(
  <Provider store={store}>
    <Demo />
  </Provider>,
    document.getElementById('demo'),
);
