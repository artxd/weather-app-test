import React, { Component } from 'react';
import arrowIcon from '../icons/windarrow.svg';
import "./WeatherColumn.css";

class WeatherColumn extends Component {
    render () {
        const wind_direction_css = {
            transform: "rotate("+this.props.wind_direction+"deg)"
        }

        return (
            <div className="column">
                <h3 className="date">{this.props.date}</h3>
                <div className="flex-row align-bottom">
                    <img className="weather-icon left-side-item" src={"https://www.metaweather.com/static/img/weather/"+this.props.state_abbr+".svg"} alt="Weather Icon" />
                    <p>{this.props.state_name}</p>
                </div>
                <div className="flex-row">
                    <p className="left-side-item">Max:</p>
                    <p>{Math.round(this.props.max_temp)} &deg;C</p>
                </div>
                <div className="flex-row smaller-top-margin">
                    <p className="left-side-item">Min:</p>
                    <p>{Math.round(this.props.min_temp)} &deg;C</p>
                </div>
                <div className="flex-row align-center">
                    <div className="left-side-item rotating-arrow-container">
                    <img style={wind_direction_css} className="arrow-icon" src={arrowIcon} alt="Arrow Icon" />
                    </div>
                    <p>{Math.round(this.props.wind_speed)}mph</p>
                </div>
			</div>
        )
    }
}

export default WeatherColumn