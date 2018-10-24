
import React, { Component } from 'react';


class Clock extends Component {


    constructor(props) {
        super(props)
    }
  
    render () {
        const longitude = this.props.longitude;
        const latitude = this.props.latitude;
        const placeSet = this.props.placeSet;

        var tzlookup = require("tz-lookup");
        console.log(tzlookup(12.7235, 13.6931)); // prints "America/New_York"
        var localTime = new Date().toLocaleTimeString('en-US', { timeZone: tzlookup(latitude,longitude) });
        var userTime = new Date().toLocaleTimeString();

        var arr = localTime.split(":");
        var arr2 = userTime.split(":");
        arr[2] = arr[2].substr(3);
        arr2[2] = arr2[2].substr(3);
        //console.log(arr)
        localTime = arr[0] + ":" + arr[1] + " " + arr[2];
        userTime = arr2[0] + ":" + arr2[1] + " " + arr2[2];

        //console.log(localTime);
  
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
                <div style={{width:156, height:156, color: "#FEA00C"}} className = "time"> 
                        <div class = "clock" > {userTime } </div>
                        Your time
                </div>
            )
        }
    }
  }
  

export default Clock
