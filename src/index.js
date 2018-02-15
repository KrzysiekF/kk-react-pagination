import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { size } from 'lodash';
import PagerCalc from './pagination/calculations';
import { setPageAction, setPagesCountAction, setDataAction } from './pagination/actions';

class Pagination extends Component {
  constructor(props) {
    super(props);

    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  state = {
    pending: false,
  };

  componentDidMount() {
    if (this.props.request) {
      this.getPageRequest();
      return;
    }

    if (this.props.startPage) {
      this.changePage(this.props.startPage);
    }

    if (this.props.openPageByElementId) {
      const page = this.findPageById();
      this.changePage(page);
    }

    this.props.setPagesCountAction(
      PagerCalc.pagesCount(this.props.children.length, this.props.pageSize),
      this.props.name,
    );
  }

  getPageRequest(page = 1) {
    if (this.props.pagination.data && this.props.pagination.data[`page-${page}`]) {
      this.props.setPageAction(page, this.props.name);
      return;
    }

    const pageSize = this.props.pageSize ? this.props.pageSize : 1;
    const request = this.props.request(pageSize, page);

    if (!request) {
      return;
    }

    this.setState({ pending: true });
    request
      .then((response) => {
        this.setState({ pending: false });
        this.props.setPageAction(response.data.page, this.props.name);
        this.props.setPagesCountAction(response.data.pagesCount, this.props.name);
        this.props.setDataAction(response.data.items, response.data.page, this.props.name);
      })
      .catch((error) => {
        this.setState({ pending: false });
        console.error(error);
      });
  }

  findPageById() {
    const id = parseInt(this.props.openPageByElementId, 10);
    const elements = this.props.children;
    let index = false;

    if (!elements) {
      return false;
    }

    elements.map((element, k) => {
      const elementID = parseInt(element.props['data-pagination-id'], 10);

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
  }

  prevPage() {
    const prev = this.props.pagination.currentPage - 1;
    this.changePage(prev);
  }

  nextPage() {
    const next = this.props.pagination.currentPage + 1;
    this.changePage(next);
  }

  changePage(page) {
    if (this.props.request) {
      this.getPageRequest(page);
      return;
    }
    this.props.setPageAction(page, this.props.name);
  }

  calculateRanges() {
    const { displayedPages } = this.props;
    const { currentPage } = this.props.pagination;
    const range = Math.floor(displayedPages / 2);
    const minPage = currentPage - range;
    const maxPage = currentPage + range;

    return { minPage, maxPage };
  }

  shouldShowPage(page) {
    let shouldShow = false;
    const { pagesCount } = this.props.pagination;
    const range = this.calculateRanges();

    if (page === 1 || (page >= range.minPage && page <= range.maxPage) ||
        page === pagesCount) {
      shouldShow = true;
    }

    return shouldShow;
  }

  resetSpaceData() {
    this.prevSpaceAdded = false;
    this.nextSpaceAdded = false;
  }

  shouldAddSpace(page) {
    let shouldShow = false;
    const { pagesCount } = this.props.pagination;
    const range = this.calculateRanges();

    if (page > 1 && page < range.minPage && !this.prevSpaceAdded) {
      shouldShow = true;
      this.prevSpaceAdded = true;
    }

    if (page < pagesCount && page > range.maxPage && !this.nextSpaceAdded) {
      shouldShow = true;
      this.nextSpaceAdded = true;
    }

    return shouldShow;
  }

  renderPagination() {
    if (this.props.onePageHide && this.props.pagination.pagesCount === 1) {
      return false;
    }

    this.resetSpaceData();

    const buttons = () => {
      const buttonsArr = [];

      for (let i = 1; i <= this.props.pagination.pagesCount; i += 1) {
        if (this.shouldShowPage(i)) {
          const button = (
            <button
              className={`${i === this.props.pagination.currentPage
                  ? 'active'
                  : ''}`}
              key={i}
              onClick={() => { this.changePage(i); }}
            >
              {i}
            </button>
          );

          buttonsArr.push(button);
        }

        if (this.shouldAddSpace(i)) {
          buttonsArr.push(<span key={i}>...</span>);
        }
      }

      return buttonsArr;
    };

    return (
      <div className={`kk-pagination kk-${this.props.align
        ? this.props.align
        : ''}`}
      >
        <button
          onClick={this.prevPage}
          disabled={this.props.pagination.currentPage <= 1}
        >{this.props.prevLabel}
        </button>
        {buttons()}
        <button
          onClick={this.nextPage}
          disabled={this.props.pagination.currentPage >=
              this.props.pagination.pagesCount}
        >{this.props.nextLabel}
        </button>
      </div>
    );
  }

  render() {
    let elementId = 0;
    const {
      pagination: { data, currentPage },
      pagination,
      children,
      pageSize,
      component,
      name,
      request,
      elementListClass,
    } = this.props;
    const { pending } = this.state;

    if (!pagination || pending) {
      return <div>Loading...</div>;
    }

    if (!size(children) && (!size(data) || !size(data[`page-${currentPage}`]))) {
      return <div>Loading...</div>;
    }

    const elements = size(children) ? children.map((element, key) => (
      PagerCalc.canDisplayElement(
        key, currentPage,
        pageSize,
      ) ? element : '')) : '';

    const requestElements = size(data) ?
      data[`page-${currentPage}`]
        .map((element) => {
          elementId += 1;
          const AjaxComponent = component;
          return (<AjaxComponent key={`${name}-${elementId}`} {...element} />);
        }) : '';

    return (
      <div className="kk-pagination-box">
        <div className={`kk-pagination-list ${elementListClass}`}>
          {!request ? elements : requestElements}
        </div>
        {this.renderPagination()}
      </div>
    );
  }
}

Pagination.defaultProps = {
  pageSize: 5,
  startPage: 1,
  align: 'center',
  prevLabel: 'prev',
  nextLabel: 'next',
  children: [],
  setPageAction: () => {},
  setPagesCountAction: () => {},
  setDataAction: () => {},
  pagination: {
    currentPage: 1,
    pagesCount: 0,
    data: {},
  },
  onePageHide: false,
  openPageByElementId: 0,
  displayedPages: 5,
  request: null,
  component: null,
  elementListClass: '',
};

Pagination.propTypes = {
  name: PropTypes.string.isRequired,
  pageSize: PropTypes.number,
  pagination: PropTypes.shape({
    currentPage: PropTypes.number,
    pagesCount: PropTypes.number,
    data: PropTypes.object,
  }),
  startPage: PropTypes.number,
  prevLabel: PropTypes.string,
  nextLabel: PropTypes.string,
  align: PropTypes.string,
  setPageAction: PropTypes.func,
  setPagesCountAction: PropTypes.func,
  setDataAction: PropTypes.func,
  children: PropTypes.any,
  onePageHide: PropTypes.bool,
  openPageByElementId: PropTypes.number,
  displayedPages: PropTypes.number,
  request: PropTypes.func,
  component: PropTypes.func,
  elementListClass: PropTypes.string,
};

const mapStateToProps = (state, props) => ({ pagination: state.paginations[props.name] });

export default connect(mapStateToProps, {
  setPageAction,
  setPagesCountAction,
  setDataAction,
})(Pagination);
