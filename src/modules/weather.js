
import React, { Component } from 'react';

import {WeatherImageContainer, WeatherImageWrapper, WeatherImg} from './../components/components'
var weatherImages = require('../images/weather.jpg');

class Weather extends Component {


  
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
            "unknown" : -1890,
            "thunderstorm" : -4583,
            "light intensity drizzle" : -2195,
            "moderate rain" : -2024,
          }
      
          var topVariable=weatherDictionary[weather];
          if (!weatherDictionary[weather]) {topVariable = -1881};
  
            return (
                <WeatherImageContainer>
                        <WeatherImageWrapper>
                        {/*<img src={weatherImages} alt = "Weather visualisation" style={{position:"absolute", left: -5, top: topVariable}}></img>*/} 
                        <WeatherImg src={weatherImages} alt="Weather visualisation" topVariable={topVariable}/>
                        </WeatherImageWrapper>
                </WeatherImageContainer>
            )
    }
  }
  




export default Weather
