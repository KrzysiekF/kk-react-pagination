var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { size } from 'lodash';
import PagerCalc from './pagination/calculations';
import { setPageAction, setPagesCountAction, setDataAction } from './pagination/actions';

var Pagination = function (_Component) {
  _inherits(Pagination, _Component);

  function Pagination(props) {
    _classCallCheck(this, Pagination);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.prevPage = _this.prevPage.bind(_this);
    _this.nextPage = _this.nextPage.bind(_this);
    return _this;
  }

  Pagination.prototype.componentDidMount = function componentDidMount() {
    if (this.props.request) {
      this.getPageRequest();
      return;
    }

    if (this.props.startPage) {
      this.changePage(this.props.startPage);
    }

    if (this.props.openPageByElementId) {
      var page = this.findPageById();
      this.changePage(page);
    }

    this.props.setPagesCountAction(PagerCalc.pagesCount(this.props.children.length, this.props.pageSize), this.props.name);
  };

  Pagination.prototype.getPageRequest = function getPageRequest() {
    var _this2 = this;

    var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    if (this.props.paginator.data && this.props.paginator.data['page-' + page]) {
      this.props.setPageAction(page, this.props.name);
      return;
    }

    var pageSize = this.props.pageSize ? this.props.pageSize : 1;
    var request = this.props.request(pageSize, page);

    request.then(function (response) {
      _this2.props.setPageAction(response.data.page, _this2.props.name);
      _this2.props.setPagesCountAction(response.data.pagesCount, _this2.props.name);
      _this2.props.setDataAction(response.data.items, response.data.page, _this2.props.name);
    }).catch(function (error) {
      console.error(error);
    });
  };

  Pagination.prototype.findPageById = function findPageById() {
    var id = parseInt(this.props.openPageByElementId, 10);
    var elements = this.props.children;
    var index = false;

    if (!elements) {
      return false;
    }

    elements.map(function (element, k) {
      var elementID = parseInt(element.props['data-pagination-id'], 10);

      if (elementID === id) {
        index = k;
      }

      return element;
    });

    if (!index) {
      console.warn('kk-react-pagination: I can\'t find element ID (data-pagination-id)');

      return 1;
    }

    return Math.ceil((index + 1) / this.props.pageSize);
  };

  Pagination.prototype.prevPage = function prevPage() {
    var prev = this.props.paginator.currentPage - 1;
    this.changePage(prev);
  };

  Pagination.prototype.nextPage = function nextPage() {
    var next = this.props.paginator.currentPage + 1;
    this.changePage(next);
  };

  Pagination.prototype.changePage = function changePage(page) {
    if (this.props.request) {
      this.getPageRequest(page);
      return;
    }
    this.props.setPageAction(page, this.props.name);
  };

  Pagination.prototype.calculateRanges = function calculateRanges() {
    var displayedPages = this.props.displayedPages;
    var currentPage = this.props.paginator.currentPage;

    var range = Math.floor(displayedPages / 2);
    var minPage = currentPage - range;
    var maxPage = currentPage + range;

    return { minPage: minPage, maxPage: maxPage };
  };

  Pagination.prototype.shouldShowPage = function shouldShowPage(page) {
    var shouldShow = false;
    var pagesCount = this.props.paginator.pagesCount;

    var range = this.calculateRanges();

    if (page === 1 || page >= range.minPage && page <= range.maxPage || page === pagesCount) {
      shouldShow = true;
    }

    return shouldShow;
  };

  Pagination.prototype.resetSpaceData = function resetSpaceData() {
    this.prevSpaceAdded = false;
    this.nextSpaceAdded = false;
  };

  Pagination.prototype.shouldAddSpace = function shouldAddSpace(page) {
    var shouldShow = false;
    var pagesCount = this.props.paginator.pagesCount;

    var range = this.calculateRanges();

    if (page > 1 && page < range.minPage && !this.prevSpaceAdded) {
      shouldShow = true;
      this.prevSpaceAdded = true;
    }

    if (page < pagesCount && page > range.maxPage && !this.nextSpaceAdded) {
      shouldShow = true;
      this.nextSpaceAdded = true;
    }

    return shouldShow;
  };

  Pagination.prototype.renderPaginator = function renderPaginator() {
    var _this3 = this;

    if (this.props.onePageHide && this.props.paginator.pagesCount === 1) {
      return false;
    }

    this.resetSpaceData();

    var buttons = function buttons() {
      var buttonsArr = [];

      var _loop = function _loop(i) {
        if (_this3.shouldShowPage(i)) {
          buttonsArr.push(React.createElement(
            'button',
            {
              className: '' + (i === _this3.props.paginator.currentPage ? 'active' : ''),
              key: i,
              onClick: function onClick() {
                _this3.changePage(i);
              }
            },
            i
          ));
        }

        if (_this3.shouldAddSpace(i)) {
          buttonsArr.push(React.createElement(
            'span',
            { key: i },
            '...'
          ));
        }
      };

      for (var i = 1; i <= _this3.props.paginator.pagesCount; i += 1) {
        _loop(i);
      }

      return buttonsArr;
    };

    return React.createElement(
      'div',
      { className: 'kk-pagination kk-' + (this.props.align ? this.props.align : '')
      },
      React.createElement(
        'button',
        {
          onClick: this.prevPage,
          disabled: this.props.paginator.currentPage <= 1
        },
        this.props.prevLabel
      ),
      buttons(),
      React.createElement(
        'button',
        {
          onClick: this.nextPage,
          disabled: this.props.paginator.currentPage >= this.props.paginator.pagesCount
        },
        this.props.nextLabel
      )
    );
  };

  Pagination.prototype.render = function render() {
    var _this4 = this;

    if (!this.props.paginator) {
      return React.createElement(
        'div',
        null,
        'Loading...'
      );
    }

    if (!size(this.props.children) && (!size(this.props.paginator.data) || !size(this.props.paginator.data['page-' + this.props.paginator.currentPage]))) {
      return React.createElement(
        'div',
        null,
        'Loading...'
      );
    }

    var elementId = 0;

    var elements = this.props.children ? this.props.children.map(function (element, key) {
      return PagerCalc.canDisplayElement(key, _this4.props.paginator.currentPage, _this4.props.pageSize) ? element : '';
    }) : '';

    var requestElements = this.props.paginator.data ? this.props.paginator.data['page-' + this.props.paginator.currentPage].map(function (data) {
      elementId += 1;
      var AjaxComponent = _this4.props.component;
      return React.createElement(AjaxComponent, _extends({ key: _this4.props.name + '-' + elementId }, data));
    }) : '';

    return React.createElement(
      'div',
      null,
      !this.props.request ? elements : requestElements,
      this.renderPaginator()
    );
  };

  return Pagination;
}(Component);

Pagination.defaultProps = {
  name: 'pagination',
  pageSize: 5,
  startPage: 1,
  align: 'center',
  prevLabel: 'prev',
  nextLabel: 'next',
  children: [],
  setPageAction: function setPageAction() {},
  setPagesCountAction: function setPagesCountAction() {},
  paginator: {
    currentPage: 1,
    pagesCount: 0
  },
  onePageHide: false,
  openPageByElementId: 0,
  displayedPages: 5
};

Pagination.propTypes = process.env.NODE_ENV !== "production" ? {
  name: PropTypes.string.isRequired,
  pageSize: PropTypes.number,
  paginator: PropTypes.shape({
    currentPage: PropTypes.number,
    pagesCount: PropTypes.number
  }),
  startPage: PropTypes.number,
  prevLabel: PropTypes.string,
  nextLabel: PropTypes.string,
  align: PropTypes.string,
  setPageAction: PropTypes.func,
  setPagesCountAction: PropTypes.func,
  children: PropTypes.any,
  onePageHide: PropTypes.bool,
  openPageByElementId: PropTypes.number,
  displayedPages: PropTypes.number
} : {};

var mapStateToProps = function mapStateToProps(state, props) {
  return { paginator: state.paginations[props.name] };
};

export default connect(mapStateToProps, {
  setPageAction: setPageAction,
  setPagesCountAction: setPagesCountAction,
  setDataAction: setDataAction
})(Pagination);