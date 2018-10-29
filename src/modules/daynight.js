
import React, { Component } from 'react';


import {HumidityWrapper, HumidityComponent, HumidityText, HumidityGraph, DayNightWrapper, DayNightComponent, Footer} from './../components/components'


class DayNight extends Component {

  
    render () {
        //Bar to show humidity in bottom left corner
        const humidity = this.props.humidity;
        const sunset = this.props.sunset;
        const sunrise = this.props.sunrise;

            

        var timeNow = Math.floor(Date.now()/1000);

        var secondsSunset = sunset - timeNow;
        var secondsSunrise = sunrise - timeNow;

        if (secondsSunrise < 24*3600) {
          secondsSunrise += 24*3600
          secondsSunset += 24*3600
        }
        if (secondsSunset > 24*3600) {
          secondsSunrise -= 24*3600
          secondsSunset -= 24*3600
        }
        if (secondsSunrise>0 && secondsSunset>0) {secondsSunset -= 24*3600}
        if (secondsSunrise>0 && secondsSunset>0) {secondsSunrise -= 24*3600}
         
        try {
        var clientHeight = document.getElementById('humidityText').clientHeight;
    }
        catch {}
        var sunNightDiv
        if (secondsSunrise <= 0) {      //day
            sunNightDiv = 
                <div>
                        <img src={require('../images/sun.png')} alt = "Sun" style={{margin:10, width:70, height:70, background:"transparent"}} />
                        <div>
                        {(secondsSunset/3600).toString().substring(0, 4)} hod until sunset
                        </div>
                </div>
        }
        else {       //night
            sunNightDiv =         
                <div id = "nightWrapper">
                    <div id="nightImg">
                        <img src={require('../images/night.png')} alt="Night" style={{margin:10, width:70, height:70, background:"transparent"}} />
                    </div>   
                    
                    <div if="nightText">
                        {(secondsSunrise/3600).toString().substring(0, 4)} hod until sunrise
                    </div>
                    
                </div>
        }

        
            return (
                <Footer>
                        
                        {sunNightDiv}
                </Footer>
            )
    }
  } 
  






export default DayNight
