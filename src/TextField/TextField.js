import React, { Component } from 'react';
import { debounce } from 'lodash';
import "./TextField.css";

const WAIT_TIME = 250;

class TextField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      criteria: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.searchDebounced = debounce(() => { this.props.search(this.state.criteria)}, WAIT_TIME);
  }

  handleChange(e) {
    this.setState({criteria: e.currentTarget.value }, () => {
      this.searchDebounced();
    });
  }

  render () {
    return (
      <input type="text" className="textField" placeholder="enter a city name" value={this.state.criteria} onChange={this.handleChange}></input>
    )
  }
}

export default TextField