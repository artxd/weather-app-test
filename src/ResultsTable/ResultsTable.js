import React, { Component } from 'react';
import "./ResultsTable.css";

class ResultsTable extends Component {
  constructor(props) {
    super(props)

  }

  render () {
    if (!this.props.results.length) {
      return null;
    } else {
    return (
      <div className="resultsTable">
        {
          this.props.results.map((result) => 
            <h3 onClick={() => { this.props.pickLocation(result) }} key={result.woeid}>{result.title}, {result.parent.title}</h3>
          )
        }
      </div>
      )
    }
  }
}

export default ResultsTable