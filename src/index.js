import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PagerCalc from './pagination/calculations';
import { setPageAction, setPagesCountAction } from './pagination/actions';

class Pagination extends Component {
  static defaultProps = {
    name: 'pagination',
    pageSize: 5,
    startPage: 1,
    align: 'center',
    prevLabel: 'prev',
    nextLabel: 'next',
    setPageAction: () => {},
    setPagesCountAction: () => {},
    paginator: {},
    onePageHide: false,
    openPageByElementId: false,
  };

  static propTypes = {
    name: PropTypes.string.isRequired,
    pageSize: PropTypes.number,
    paginator: PropTypes.object,
    startPage: PropTypes.number,
    prevLabel: PropTypes.string,
    nextLabel: PropTypes.string,
    align: PropTypes.string,
    setPageAction: PropTypes.func,
    setPagesCountAction: PropTypes.func,
    children: PropTypes.array.isRequired,
    onePageHide: PropTypes.bool,
    openPageByElementId: PropTypes.any,
  };

  constructor(props) {
    super(props);

    this.state = {
      pagesCount: 1,
    };

    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  componentWillMount() {

    if (this.props.startPage) {
      this.changePage(this.props.startPage);
    }

    if (this.props.openPageByElementId) {
      const page = this.findPageById();
      this.changePage(page);
    }

    this.props.setPagesCountAction(
        PagerCalc.pagesCount(this.props.children.length, this.props.pageSize),
        this.props.name);
  }

  findPageById() {
    const id = this.props.openPageByElementId;
    const elements = this.props.children;
    let index = false;

    elements.map((element, k) => {
      if (element.props['data-pagination-id'] === id) {
        index = k;
      }

      return element;
    });

    if (!index) {
      console.warn('kk-react-pagination: I can\'t find element ID (data-pagination-id)');
    }

    return Math.ceil((index + 1) / this.props.pageSize);
  }

  prevPage() {
    const prev = this.props.paginator.currentPage - 1;
    this.changePage(prev);
  }

  nextPage() {
    const next = this.props.paginator.currentPage + 1;
    this.changePage(next);
  }

  changePage(page) {
    this.props.setPageAction(page, this.props.name);
  }

  renderPaginator() {
    if (this.props.onePageHide) {
      return false;
    }

    const buttons = () => {
      const buttonsArr = [];

      for (let i = 1; i <= this.props.paginator.pagesCount; i += 1) {
        buttonsArr.push(
          <button
            className={`${i === this.props.paginator.currentPage
                    ? 'active'
                    : ''}`}
            key={i}
            onClick={() => { this.changePage(i); }}
          >
            {i}
          </button>,
        );
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
          disabled={this.props.paginator.currentPage <= 1}
        >{this.props.prevLabel}
        </button>
        {buttons()}
        <button
          onClick={this.nextPage}
          disabled={this.props.paginator.currentPage >=
            this.props.paginator.pagesCount}
        >{this.props.nextLabel}
        </button>
      </div>
    );
  }

  render() {
    if (!this.props.paginator) {
      return <div>Loading...</div>;
    }

    const elements = this.props.children.map(
      (element, key) => (
          PagerCalc.canDisplayElement(key, this.props.paginator.currentPage,
              this.props.pageSize) ? element : ''),
      );

    return (
      <div>
        {elements}
        {this.renderPaginator()}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  paginator: state.paginations[props.name],
});

export default connect(mapStateToProps, { setPageAction, setPagesCountAction })(
    Pagination);
