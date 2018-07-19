import React, { Component } from 'react';
import "./WeatherInfo.css";
import WeatherColumn from '../WeatherColumn/WeatherColumn';

class WeatherInfo extends Component {
  constructor(props) {
    super(props)

    this.createColumns = this.createColumns.bind(this);
  }

  createColumns() {
    let columns = []
    let location = this.props.location;

    for (let i = 0; i < 3; i++) {
      let column = <WeatherColumn key={i} date={(i === 0) ? "Today" : (i === 1) ? "Tomorrow" : location.consolidated_weather[i].applicable_date.split("-").join("/")} max_temp={location.consolidated_weather[i].max_temp} min_temp={location.consolidated_weather[i].min_temp}
      wind_speed={location.consolidated_weather[i].wind_speed} wind_direction={location.consolidated_weather[i].wind_direction}
      state_name={location.consolidated_weather[i].weather_state_name} state_abbr={location.consolidated_weather[i].weather_state_abbr} />;
      columns.push(column);
    }

    return columns;
  }

  render () {
    return (
      <div className="weatherinfo">
        {this.createColumns()}
      </div>
    )
  }
}

export default WeatherInfo