import React, { Component } from 'react';
import axios from 'axios';
import { getLocationList, getWeatherInformation }  from './api.js';
import './App.css';
import logo from './icons/mc-logo.png';
import TextField from './TextField/TextField';
import LoadingSpinner from './LoadingSpinner/LoadingSpinner';
import ResultsTable from './ResultsTable/ResultsTable';
import WeatherInfo from './WeatherInfo/WeatherInfo';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      locationPicked: false,
      location: null,
      results: []
    };

    this.requestSource = axios.CancelToken.source();

    this.searchForLocations = this.searchForLocations.bind(this);
    this.getAllResults = this.getAllResults.bind(this);
    this.handleLocationPicking = this.handleLocationPicking.bind(this);
  }

  searchForLocations(criteria) {
    this.requestSource.cancel('Operation canceled by the user.');

    this.requestSource = axios.CancelToken.source();

    this.setState({ loading: true, results: [], locationPicked: false, location: null});

    if(!criteria || criteria.trim().length < 2) {
      this.setState({ loading: false });
    } else {
      getLocationList(criteria.toLowerCase().trim(), this.requestSource.token)
        .then((result) => {
            this.getAllResults(result.data);
        })
        .catch((error) => {
          if (axios.isCancel(error)) {
            console.log('Request canceled', error.message);
          } else {
            console.log('Error occured', error.message);
          }
        })
    }
  }

getAllResults(cities) {
  let promises = [];
  let searchResults = [];

  for (let i = 0; i < cities.length; i++) {
    promises.push(getWeatherInformation(cities[i].woeid, this.requestSource.token)
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          console.log('Error occured', error.message);
        }
      })
    )
  }

  axios.all(promises, {cancelToken: this.requestSource.token})
    .then((results) => {
      results.forEach((response) => {
        searchResults.push(response.data);
      })
      this.setState({loading: false, results: searchResults});
    })
    .catch((error) => {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message);
      } else {
        console.log('Error occured', error.message);
      }
    })
  }

  handleLocationPicking(pickedLocation) {
    this.setState({locationPicked: true, location: pickedLocation});
    this.refs.textFieldReference.valueToPickedLocation(pickedLocation);
  }

  render() {
    return (
      <div className="main">
          <div className="header"><img src={logo} alt="Mooncascade"/></div>
          <div className="container">
        	  <TextField ref="textFieldReference" locationPicked={this.state.locationPicked} search={this.searchForLocations} />
            { this.state.loading ? <LoadingSpinner /> : this.state.locationPicked ?
              <WeatherInfo location={this.state.location}/> : <ResultsTable pickLocation={this.handleLocationPicking} results={this.state.results} />}
          </div>
      </div>
    );
  }
}

export default App;
