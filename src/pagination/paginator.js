import React, { Component } from 'react'

class Paginator extends Component {

    constructor (props) {
        super(props)

        this.prevPage = this.prevPage.bind(this)
        this.nextPage = this.nextPage.bind(this)
    }

    prevPage () {
        const prev = this.state.currentPage - 1
        this.props.changePage(prev)
    }

    nextPage () {
        const next = this.state.currentPage + 1
        this.props.changePage(next)
    }

    render () {
        let buttons = () => {
            let buttons = []

            for (let i = 1; i <= this.state.pagesCount; i++) {
                buttons.push(
                    <button className={`${i === this.state.currentPage ? 'active' : ''}`} key={i} onClick={() => { this.props.changePage(i) }}>
                        {i}
                    </button>
                )
            }

            return buttons
        }

        return (
            <div>
                <button onClick={this.prevPage} disabled={this.state.currentPage <= 1}>prev</button>
                    {buttons()}
                <button onClick={this.nextPage} disabled={this.state.currentPage >= this.state.pagesCount}>next</button>
            </div>
        )
    }

}

export default Paginator
