
import React, { Component } from 'react';


class DayNight extends Component {


    
  
    render () {
        //Bar to show humidity in bottom left corner
        const humidity = this.props.humidity;
        const sunset = this.props.sunset;
        const sunrise = this.props.sunrise;

        var humidityBar = 

            <div className="humidityWrapper animateOpacity" >
                    <div className="humidityBar">
                        <div style={{width: 2*humidity , height:30}} className = "humidity"></div>
                        <div style={{width:200, textAlign:"left", paddingLeft:12}} className="humidityText">humidity: {humidity}%</div>
                    </div>
             </div>

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
                <div className = "dayNightWrapper">
                    <div className = "dayNight animateSunMoon"  >
                        <img src={require('../images/sun.png')} alt = "Sun" style={{margin:10, width:70, height:70, background:"transparent"}} />
                        <div>
                        {(secondsSunset/3600).toString().substring(0, 4)} hod until sunset
                        </div>
                    </div>
                </div>
        }
        else {       //night
            sunNightDiv =         
                <div className = "dayNightWrapper">
                    <div className = "dayNight animateSunMoon"  >
                        <img src={require('../images/night.png')} alt="Night" style={{margin:10, width:70, height:70, background:"transparent"}} />
                        <div>
                        {(secondsSunrise/3600).toString().substring(0, 4)} hod until sunrise
                        </div>
                    </div>
                </div>
        }

        
            return (
                <div className = "footer">
                        {humidityBar}
                        {sunNightDiv}
                </div>
            )
    }
  } 
  

export default DayNight
