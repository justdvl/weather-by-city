




import React, { Component } from 'react';


import {HumidityWrapper, HumidityComponent, HumidityText, HumidityGraph} from './../components/components'


class Humidity extends Component {

  
    render () {
        //Bar to show humidity in bottom left corner
        const humidity = this.props.humidity;
       

        
            return (
               
                                <HumidityComponent>
                                    
                                    <HumidityText /*className="neonShadow"*/>
                                        humidity: {humidity}% 
                                    </HumidityText>

                                    <HumidityGraph humidityWidth={2*humidity}>
                                    </HumidityGraph>
                                </HumidityComponent>
                

            )
    }
  } 
  






export default Humidity
