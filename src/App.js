import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
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
      results: []
    };

    this.requestSource = axios.CancelToken.source();

    this.search = this.search.bind(this);
    this.getSearchResults = this.getSearchResults.bind(this);
  }

  search(criteria) {
    this.requestSource.cancel('Operation canceled by the user.');

    this.requestSource = axios.CancelToken.source();

    this.setState({
      loading: true, 
      results: []
    });

    if(!criteria || criteria.length < 2) {
      console.log("empty criteria!");
      this.setState({ loading: false });
    } else {
      axios.get("http://internship-proxy.aw.ee:3001/location?query="+criteria.toLowerCase(), {cancelToken: this.requestSource.token})
        .then((result) => {
            this.getSearchResults(result.data);
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

getSearchResults(cities) {
  let promises = [];
  let searchResults = [];

  for (let i = 0; i < cities.length; i++) {
    promises.push(axios.get("http://internship-proxy.aw.ee:3001/location/"+cities[i].woeid, {cancelToken: this.requestSource.token})
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          console.log('Error occured', error.message);
        }
      })
    )
  }

  axios.all(promises)
  .then((results) => {
    results.forEach((response) => {
      searchResults.push(response.data);
    })
    console.log(searchResults);
    this.setState({loading: false, results: searchResults});
  })
}

  render() {
    return (
      <div className="main">
          <div className="container">
        	  <TextField loading={this.state.loading} search={this.search} />
            {this.state.loading ? <LoadingSpinner /> : this.state.locationPicked ? <WeatherInfo /> : <ResultsTable results={this.state.results} />}
          </div>
      </div>
    );
  }
}

export default App;
