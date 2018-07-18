import React, { Component } from 'react';
import "./LoadingSpinner.css";

class LoadingSpinner extends Component {
  constructor(props) {
    super(props)

  }

  render () {
    return (
      <div className="loadingContainer">
        <div className="lds-eclipse"><div></div></div>
      </div>
    )
  }
}

export default LoadingSpinner