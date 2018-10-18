
import React, { Component } from 'react';


class DayNight extends Component {


    constructor(props) {
        super(props)
    }
  
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
    
    
        var percentOfDayNight = secondsSunrise/(-secondsSunset+secondsSunrise) ;
        
        if (secondsSunrise <= 0) {
            var sunNightDiv = 
                <div style={{position: "absolute", bottom: 0, width: 200+700*percentOfDayNight, height: 150}}>
                    <div className = "night" style={{position:"absolute"}} >
                        <img src={require('./sun2.png')} style={{margin:10, width:70, height:70, background:"transparent"}} />
                        <div className = "day" style={{position:"absolute", top: 91}}>
                        {(secondsSunset/3600).toString().substring(0, 4)} hod until sunset
                        </div>
                    </div>
                </div>
        }
        else 
        {var sunNightDiv =         
            <div  style={{position: "absolute", bottom: 0, width:200+700*(1-percentOfDayNight), height: 150}}>
                    <div className = "night" style={{position:"absolute"}} >
                        <img src={require('./night.png')} style={{margin:10, width:70, height:70}} />
                        <div style={{position:"absolute", top: 91}}>
                        {(secondsSunrise/3600).toString().substring(0, 4)} hod until sunrise
                        </div>
                    </div>
            </div>
        }

            return (
                <div>
                       {sunNightDiv}
                </div>
            )
    }
  }
  

export default DayNight
