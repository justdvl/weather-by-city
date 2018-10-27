
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
                <DayNightWrapper>
                    <DayNightComponent>
                        <img src={require('../images/sun.png')} alt = "Sun" style={{margin:10, width:70, height:70, background:"transparent"}} />
                        <div>
                        {(secondsSunset/3600).toString().substring(0, 4)} hod until sunset
                        </div>
                    </DayNightComponent>
                </DayNightWrapper>
        }
        else {       //night
            sunNightDiv =         
                <DayNightWrapper>
                    <DayNightComponent>
                        <img src={require('../images/night.png')} alt="Night" style={{margin:10, width:70, height:70, background:"transparent"}} />
                        <div>
                        {(secondsSunrise/3600).toString().substring(0, 4)} hod until sunrise
                        </div>
                    </DayNightComponent>
                </DayNightWrapper>
        }

        
            return (
                <Footer>
                        <HumidityWrapper>
                                <HumidityComponent>
                                    <HumidityGraph humidityWidth={2*humidity}>
                                    </HumidityGraph>
                                    <HumidityText className="neonShadow" id ="humidityText">
                                        humidity: {humidity}% 
                                    </HumidityText>
                                </HumidityComponent>
                        </HumidityWrapper>
                        {sunNightDiv}
                </Footer>
            )
    }
  } 
  






export default DayNight
