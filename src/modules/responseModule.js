 
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
       
        //var cityName = this.props.cityName;
       
        var weatherData = this.props.weatherData;
       
        var temp = Math.round(10*(weatherData.main.temp-273.15))/10
        
        var hue = this.calculateHue(temp)

        /*
        //remove comma and everything behind comma, to not show country code
        var cityNameCropped = cityName.slice(0,1).toUpperCase() + cityName.slice(1, cityName.length)
        var n = cityNameCropped.indexOf(',');
        cityNameCropped = cityNameCropped.substring(0, n != -1 ? n : cityNameCropped.length);
         */
        

            return (
            <div> 
                <p>{weatherData.name}, {isoCountries[weatherData.sys.country]}</p>
                <p>{weatherData.weather[0].description} | <span style={{color:  'hsl('+hue+',80%,60%)'}}>{temp}°C</span></p>
            </div>
            )
                
    }
  }
  

export default ResponseModule

 
 
 
 
 
 