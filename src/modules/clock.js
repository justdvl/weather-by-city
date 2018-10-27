
import React, { Component } from 'react';
import {ClockContainer, ClockComponent} from './../components/components'



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
                <ClockContainer> 
                        <ClockComponent> {localTime}  </ClockComponent>
                        local time
                </ClockContainer>
            )
        }
        else {
            return (
                <ClockContainer> 
                        <ClockComponent> {userTime}  </ClockComponent>
                        Your time
                </ClockContainer>
            )
        }
    }
  }
  
////////////////////////////////


export default Clock
