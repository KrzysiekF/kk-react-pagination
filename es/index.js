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

        _this.state = {
            pending: false
        };


        _this.prevPage = _this.prevPage.bind(_this);
        _this.nextPage = _this.nextPage.bind(_this);
        return _this;
    }

    Pagination.prototype.componentDidMount = function componentDidMount() {
        if (this.props.request) {
            this.getPageRequest(this.props.pagination.currentPage, this.props.filters);
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

    Pagination.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
        if (this.props.request && this.props.filters !== prevProps.filters) {
            this.getPageRequest(this.props.pagination.currentPage, this.props.filters, true);
            return;
        }

        if (this.props.openPageByElementId && this.props.openPageByElementId !== prevProps.openPageByElementId) {
            var page = this.findPageById();
            this.changePage(page);
        }

        if (this.props.startPage && this.props.startPage !== prevProps.startPage) {
            this.changePage(this.props.startPage);
        }
    };

    Pagination.prototype.getPageRequest = function getPageRequest() {
        var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

        var _this2 = this;

        var filters = arguments[1];
        var forceRequest = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (!forceRequest && this.props.pagination.data && this.props.pagination.data['page-' + page]) {
            this.props.afterPageChange(page);
            this.props.setPageAction(page, this.props.name);
            return;
        }

        var pageSize = this.props.pageSize ? this.props.pageSize : 1;
        var request = this.props.request(pageSize, page, filters);

        if (!request) {
            return;
        }

        this.props.beforeRequest();
        this.setState({ pending: true });
        request.then(function (response) {
            _this2.setState({ pending: false });
            _this2.props.setPageAction(response.data.page, _this2.props.name);
            _this2.props.setPagesCountAction(response.data.pagesCount, _this2.props.name);
            _this2.props.setDataAction(response.data.items, response.data.page, _this2.props.name);

            _this2.props.afterRequest(response);
            _this2.props.afterPageChange(page);
        }).catch(function (error) {
            _this2.setState({ pending: false });
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
            if (!element) {
                return element;
            }

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
        var prev = this.props.pagination.currentPage - 1;
        this.changePage(prev);
    };

    Pagination.prototype.nextPage = function nextPage() {
        var next = this.props.pagination.currentPage + 1;
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
        var currentPage = this.props.pagination.currentPage;

        var range = Math.floor(displayedPages / 2);
        var minPage = currentPage - range;
        var maxPage = currentPage + range;

        return { minPage: minPage, maxPage: maxPage };
    };

    Pagination.prototype.shouldShowPage = function shouldShowPage(page) {
        var shouldShow = false;
        var pagesCount = this.props.pagination.pagesCount;

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
        var pagesCount = this.props.pagination.pagesCount;

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

    Pagination.prototype.renderPagination = function renderPagination() {
        var _this3 = this;

        if (this.props.onePageHide && this.props.pagination.pagesCount === 1) {
            return false;
        }

        this.resetSpaceData();

        var buttons = function buttons() {
            var buttonsArr = [];

            var _loop = function _loop(i) {
                if (_this3.shouldShowPage(i)) {
                    var button = React.createElement(
                        'button',
                        {
                            className: '' + (i === _this3.props.pagination.currentPage ? 'active' : ''),
                            key: i,
                            onClick: function onClick() {
                                _this3.changePage(i);
                            }
                        },
                        i
                    );

                    buttonsArr.push(button);
                }

                if (_this3.shouldAddSpace(i)) {
                    buttonsArr.push(React.createElement(
                        'span',
                        { key: i },
                        '...'
                    ));
                }
            };

            for (var i = 1; i <= _this3.props.pagination.pagesCount; i += 1) {
                _loop(i);
            }

            return buttonsArr;
        };

        return React.createElement(
            'div',
            { className: '\n        kk-pagination \n        kk-' + (this.props.align ? this.props.align : '') + '\n        ' + this.props.customClass + '\n        '
            },
            React.createElement(
                'button',
                {
                    onClick: this.prevPage,
                    disabled: this.props.pagination.currentPage <= 1
                },
                this.props.prevLabel
            ),
            buttons(),
            React.createElement(
                'button',
                {
                    onClick: this.nextPage,
                    disabled: this.props.pagination.currentPage >= this.props.pagination.pagesCount
                },
                this.props.nextLabel
            )
        );
    };

    Pagination.prototype.renderLoader = function renderLoader() {
        return React.createElement(
            'div',
            { className: 'kk-pagination-loader-box' },
            this.props.loader
        );
    };

    Pagination.prototype.render = function render() {
        var elementId = 0;
        var _props = this.props,
            _props$pagination = _props.pagination,
            data = _props$pagination.data,
            currentPage = _props$pagination.currentPage,
            pagination = _props.pagination,
            children = _props.children,
            pageSize = _props.pageSize,
            component = _props.component,
            name = _props.name,
            request = _props.request,
            elementListClass = _props.elementListClass,
            emptyListMsg = _props.emptyListMsg;
        var pending = this.state.pending;


        if (!pending && (!pagination || !size(children) && (!size(data) || !size(data['page-' + currentPage])))) {
            return React.createElement(
                'div',
                { className: 'kk-pagination-empty' },
                emptyListMsg
            );
        }

        var elements = size(children) ? children.map(function (element, key) {
            return PagerCalc.canDisplayElement(key, currentPage, pageSize) ? element : '';
        }) : '';

        var requestElements = size(data) ? data['page-' + currentPage].map(function (element) {
            elementId += 1;
            var AjaxComponent = component;
            return React.createElement(AjaxComponent, _extends({ key: name + '-' + elementId }, element, { firstElement: currentPage === 1 && elementId === 1 }));
        }) : '';

        var listElements = !request ? elements : requestElements;

        return React.createElement(
            'div',
            { className: 'kk-pagination-box' },
            React.createElement(
                'div',
                { className: 'kk-pagination-list ' + elementListClass },
                pending ? this.renderLoader() : listElements
            ),
            this.renderPagination()
        );
    };

    return Pagination;
}(Component);

Pagination.defaultProps = {
    pageSize: 5,
    filters: null,
    startPage: 1,
    align: 'center',
    prevLabel: 'prev',
    nextLabel: 'next',
    loader: 'Loading...',
    emptyListMsg: 'Nothing to display',
    children: [],
    setPageAction: function setPageAction() {},
    setPagesCountAction: function setPagesCountAction() {},
    setDataAction: function setDataAction() {},
    afterPageChange: function afterPageChange() {},
    afterRequest: function afterRequest() {},
    beforeRequest: function beforeRequest() {},
    pagination: {
        currentPage: 1,
        pagesCount: 0,
        data: {}
    },
    onePageHide: false,
    openPageByElementId: 0,
    displayedPages: 5,
    request: null,
    component: null,
    elementListClass: '',
    customClass: ''
};

Pagination.propTypes = process.env.NODE_ENV !== "production" ? {
    name: PropTypes.string.isRequired,
    filters: PropTypes.string,
    pageSize: PropTypes.number,
    pagination: PropTypes.shape({
        currentPage: PropTypes.number,
        pagesCount: PropTypes.number,
        data: PropTypes.object
    }),
    startPage: PropTypes.number,
    prevLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    nextLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    loader: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    emptyListMsg: PropTypes.string,
    align: PropTypes.string,
    setPageAction: PropTypes.func,
    setPagesCountAction: PropTypes.func,
    setDataAction: PropTypes.func,
    afterPageChange: PropTypes.func,
    afterRequest: PropTypes.func,
    beforeRequest: PropTypes.func,
    children: PropTypes.any,
    onePageHide: PropTypes.bool,
    openPageByElementId: PropTypes.number,
    displayedPages: PropTypes.number,
    request: PropTypes.func,
    component: PropTypes.func,
    elementListClass: PropTypes.string,
    customClass: PropTypes.string
} : {};

var mapStateToProps = function mapStateToProps(state, props) {
    return { pagination: state.paginations[props.name] };
};

export default connect(mapStateToProps, {
    setPageAction: setPageAction,
    setPagesCountAction: setPagesCountAction,
    setDataAction: setDataAction
})(Pagination);