import React, { Component } from 'react';

class AjaxElement extends Component {
  render() {
    console.log('-> props: ', this.props);

    return (
      <div className="list-element">
        {this.props.name}
      </div>
    );
  }
}

export default AjaxElement;
