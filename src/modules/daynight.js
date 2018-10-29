
import React, { Component } from 'react';


import {NightWrapper} from './../components/components'


class DayNight extends Component {

  
    render () {
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
      
        var sunNightDiv
        if (secondsSunrise <= 0) {      //day
            sunNightDiv = 
                <NightWrapper>
                        <img src={require('../images/sun.png')} alt = "Sun" style={{margin:10, width:70, height:70, background:"transparent"}} />
                        {(secondsSunset/3600).toString().substring(0, 4)} hod until sunset
                </NightWrapper>
        }
        else {       //night
            sunNightDiv =         
                <NightWrapper>
                        <img src={require('../images/night.png')} alt="Night" style={{margin:10, width:70, height:70, background:"transparent"}} />
                    
                        {(secondsSunrise/3600).toString().substring(0, 4)} hod until sunrise
                    
                </NightWrapper>
        }

        
            return (
                    <div>
                        {sunNightDiv}
                    </div>
                        
            )
    }
  } 
  

export default DayNight
