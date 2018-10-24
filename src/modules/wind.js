 
import React, { Component } from 'react';
import arrowUp from './../images/arrow-up.png';

class Wind extends Component {


    constructor(props) {
        super(props)
    }


      updateWindDirection (deg) {
        var x = Math.ceil(((deg % 360)-22.5)/45);
        console.log ("x: ", x)
        switch (x) {
          case  0: return "north"; break; 
          case  1: return "north east"; break;
          case  2: return "east"; break;
          case  3: return "south east"; break;
          case  4: return "south"; break;
          case  5: return "south west"; break;
          case  6: return "west"; break;
          case  7: return "north west"; break;
          case  8: return "north"; break;
          default: return "minimal"; 
        }
      }
    
    render () {
       
       
       
        var weatherData = this.props.weatherData;
       
     

        var windDirection = this.updateWindDirection(weatherData.wind.deg)

        

            return (
            <div className="wind"> 
                <p>{windDirection} wind <img style={{marginLeft:5, paddingBottom:0, marginRight:5, width:22, transform: "rotate("+weatherData.wind.deg+"deg)"}} src={arrowUp}></img> | {weatherData.wind.speed} m/s</p>
            </div>
            )
                
    }
  }
  

export default Wind

 
 
 
 
 
 