import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import PagerCalc from './pagination/calculations'
import { setPageAction, setPagesCountAction } from './pagination/actions'

class Pagination extends Component {

    static defaultProps = {
        pageSize: 5,
        startPage: 1
    }

    constructor (props) {
        super(props)

        this.state = {
            pagesCount: 1
        }

        this.prevPage = this.prevPage.bind(this)
        this.nextPage = this.nextPage.bind(this)
    }

    componentWillMount () {
        this.changePage(this.props.startPage)
        this.props.setPagesCountAction(PagerCalc.pagesCount(this.props.children.length, this.props.pageSize), this.props.name)
    }

    prevPage () {
        const prev = this.props.paginator.currentPage - 1
        this.changePage(prev)
    }

    nextPage () {
        const next = this.props.paginator.currentPage + 1
        this.changePage(next)
    }

    changePage (page) {
        this.props.setPageAction(page, this.props.name)
    }

    renderPaginator () {
        let buttons = () => {
            let buttons = []

            for (let i = 1; i <= this.props.paginator.pagesCount; i++) {
                buttons.push(
                    <button className={`${i === this.props.paginator.currentPage ? 'active' : ''}`} key={i} onClick={() => { this.changePage(i) }}>
                        {i}
                    </button>
                )
            }

            return buttons
        }

        return (
            <div>
                <button onClick={this.prevPage} disabled={this.props.paginator.currentPage <= 1}>prev</button>
                    {buttons()}
                <button onClick={this.nextPage} disabled={this.props.paginator.currentPage >= this.props.paginator.pagesCount}>next</button>
            </div>
        )
    }

    render () {
        if (!this.props.paginator) {
            return <div>Loading...</div>
        }

        let elements = this.props.children.map((element, key) => {
            return (PagerCalc.canDisplayElement(key, this.props.paginator.currentPage, this.props.pageSize)) ? element : ''
        })

        return (
            <div>
                {elements}
                {this.renderPaginator()}
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        paginator: state.paginations[props.name]
    }
}

export default connect(mapStateToProps, { setPageAction, setPagesCountAction })(Pagination)
