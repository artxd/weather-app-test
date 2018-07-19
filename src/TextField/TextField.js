import React, { Component } from 'react';
import { debounce } from 'lodash';
import pinIcon from '../icons/ic-pin.svg';
import closeIcon from '../icons/ic-close.svg';
import "./TextField.css";

const WAIT_TIME = 250;

class TextField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      criteria: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.clearSelectedLocation = this.clearSelectedLocation.bind(this);
    this.searchDebounced = debounce(() => { this.props.search(this.state.criteria)}, WAIT_TIME);
  }

  handleChange(e) {
    this.setState({criteria: e.currentTarget.value }, () => {
      this.searchDebounced();
    });
  }

  valueToPickedLocation(location) {
    this.setState({ criteria: (location.title + ", " + location.parent.title) });
  }

  clearSelectedLocation() {
    this.setState({criteria: "" }, () => {
      this.searchDebounced();
    });
  }

  render () {
    return (
      <div className="searchbox">
        <img className="pin-icon" src={pinIcon} alt="Pin Icon" />
        <input type="text" className="textfield" placeholder="Search location..." value={this.state.criteria} onChange={this.handleChange}></input>
        <span className={this.state.criteria.length > 0 ? 'tag' : 'tag hidden'}>Search location...</span>
        {this.props.locationPicked ? <img onClick={() => { this.clearSelectedLocation() }} className="close-icon" src={closeIcon} alt="Pin Icon" /> : null}
		  </div>
    )
  }
}

export default TextField