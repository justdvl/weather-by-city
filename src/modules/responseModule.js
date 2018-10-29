 
import React, { Component } from 'react';
import { isoCountries } from './../constants/isoconstants';

class ResponseModule extends Component {

    calculateHue(temp) {
        var hue = 115;
        if (temp < 15) {hue =  185+2*(temp)}
        if (temp < 0) {hue = 185}
        if (temp > 15) {hue =  111-3.5*(temp)}
        if (temp > 50) {hue = 0}
        return hue;
      }
    
    render () {
       
        var weatherData = this.props.weatherData;
       
        var temp = Math.round(10*(weatherData.main.temp-273.15))/10
        
        var hue = this.calculateHue(temp)

            return (
            <div> 
                <p style={{fontSize: 3 + "em", marginTop: 0.5 + "em", marginBottom: 0.5 + "em", paddingLeft: 0.3 + "em", paddingRight: 0.3 + "em"}} className="c neon">{weatherData.name}, {isoCountries[weatherData.sys.country]}</p>
                <p style={{marginBottom: 0.1 + "em"}} className="neon white">{weatherData.weather[0].description} | <span style={{fontWeight: 900, color:  'hsl('+hue+',80%,60%)'}}>{temp}°C</span></p>
            </div>
            )
                
    }
  }
  





export default ResponseModule

 
 
 
 
 
 