function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

var Paginator = function (_Component) {
  _inherits(Paginator, _Component);

  function Paginator(props) {
    _classCallCheck(this, Paginator);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.prevPage = _this.prevPage.bind(_this);
    _this.nextPage = _this.nextPage.bind(_this);
    return _this;
  }

  Paginator.prototype.prevPage = function prevPage() {
    var prev = this.state.currentPage - 1;
    this.props.changePage(prev);
  };

  Paginator.prototype.nextPage = function nextPage() {
    var next = this.state.currentPage + 1;
    this.props.changePage(next);
  };

  Paginator.prototype.render = function render() {
    var _this2 = this;

    var buttons = function buttons() {
      var buttons = [];

      var _loop = function _loop(i) {
        buttons.push(React.createElement(
          'button',
          {
            className: '' + (i === _this2.state.currentPage ? 'active' : ''),
            key: i, onClick: function onClick() {
              _this2.props.changePage(i);
            } },
          i
        ));
      };

      for (var i = 1; i <= _this2.state.pagesCount; i++) {
        _loop(i);
      }

      return buttons;
    };

    return React.createElement(
      'div',
      null,
      React.createElement(
        'button',
        { onClick: this.prevPage,
          disabled: this.state.currentPage <= 1 },
        'prev'
      ),
      buttons(),
      React.createElement(
        'button',
        { onClick: this.nextPage,
          disabled: this.state.currentPage >= this.state.pagesCount },
        'next'
      )
    );
  };

  return Paginator;
}(Component);

export default Paginator;