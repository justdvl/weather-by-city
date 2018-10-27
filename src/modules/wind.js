 
import React, { Component } from 'react';
import arrowUp from './../images/arrow-up.png';
import {WindWrapper, WindDirectionImg} from './../components/components'



class Wind extends Component {

   

      updateWindDirection (deg) {
        var x = Math.ceil(((deg % 360)-22.5)/45);
        console.log ("x: ", x)
        switch (x) {
          case  0: return "north"; 
          case  1: return "north east"; 
          case  2: return "east"; 
          case  3: return "south east"; 
          case  4: return "south"; 
          case  5: return "south west"; 
          case  6: return "west"; 
          case  7: return "north west"; 
          case  8: return "north"; 
          default: return "minimal"; 
        }
      }
    
    render () {
       
        var weatherData = this.props.weatherData;
        var windDirection = this.updateWindDirection(weatherData.wind.deg)

            return (
            <WindWrapper> 
                <p className="neon"> {windDirection} wind 
                <WindDirectionImg alt = "wind direction" deg = {weatherData.wind.deg} src={arrowUp} /> 
                | {weatherData.wind.speed} m/s</p>
            </WindWrapper>
            )         
    }
  }
  

export default Wind

 
 
 
 
 
 