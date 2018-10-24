
import React, { Component } from 'react';

var weatherImages = require('../images/weather.jpg');

class Weather extends Component {


    constructor(props) {
        super(props)
    }
  
    render () {
        const weather = this.props.description;
        const weatherDictionary = {
            "overcast clouds" : -309,
            "clear sky" : -1270,
            "mist" : -3468,
            "light rain" : -2185,
            "few clouds" : -3151,
            "haze" : -615,
            "broken clouds" : -3151,
            "fog" : -3473, 
            "thunderstorm with light rain" : -4422,
            "heavy intensity rain" : -3943,
            "scattered clouds" : -3156,
            "shower rain" : -2024,
            "unknown" : -1881,
            "thunderstorm" : -4583,
          }
      
          var topVariable=weatherDictionary[weather];
          if (!weatherDictionary[weather]) {topVariable = -1881};
  
  
            return (
                <div className="weatherImageContainer">
                        <div style={{width:156, height:156, overflow:"hidden", position:"relative", margin: "auto"}} >
                            <img src={weatherImages} style={{position:"absolute", left: -5, top: topVariable}}></img> 
                        </div>
                </div>
            )
    }
  }
  

export default Weather
