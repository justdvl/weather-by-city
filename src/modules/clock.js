
import React, { Component } from 'react';


class Clock extends Component {


   
    render () {
        const longitude = this.props.longitude;
        const latitude = this.props.latitude;
        const placeSet = this.props.placeSet;

        var tzlookup = require("tz-lookup");
       
        var localTime = new Date().toLocaleTimeString('en-US', { timeZone: tzlookup(latitude,longitude) });
        var userTime = new Date().toLocaleTimeString();

        var arr = localTime.split(":");
        var arr2 = userTime.split(":");
        arr[2] = arr[2].substr(3);
        arr2[2] = arr2[2].substr(3);
        
        localTime = arr[0] + ":" + arr[1] + " " + arr[2];
        userTime = arr2[0] + ":" + arr2[1] + " " + arr2[2];
  
        if (placeSet) {   
            return (
                <div className = "clockContainer" > 
                        <div className = "clock" >{localTime}  </div>
                        local time
                </div>
            )
        }
        else {
            return (
                <div className = "clockContainer" > 
                        <div className = "clock" >{userTime}  </div>
                        Your time
                </div>
            )
        }
    }
  }
  

export default Clock
