import React, { Component } from 'react';
import Clock from './clock';
import Weather from './weather';
import DayNight from './daynight';

import './App.css';
import arrowUp from './arrow-right.png';
import { isoCountries } from './isoconstants';





class App extends Component {

  constructor(props){
    super (props);
    this.state = {
      wind: [],
      winddir : "unknow",
      temp : "?",
      weather : "",
      errorCode :"?",
      cityName: "",
      myName: "",
      hue: 100,
      longitude:0,
      latitude:0,
      humidity:0,
      visibility:0
    }

    this.setCityName = this.setCityName.bind(this)
  }

  updateWindDirection (deg) {
    var x = Math.ceil(((deg % 360)-22.5)/45);
    console.log ("x: ", x)
    switch (x) {
      case  0: this.setState ({winddir : "north"}); break; 
      case  1: this.setState ({winddir : "north east"}); break;
      case  2: this.setState ({winddir : "east"}); break;
      case  3: this.setState ({winddir : "south east"}); break;
      case  4: this.setState ({winddir : "south"}); break;
      case  5: this.setState ({winddir : "south west"}); break;
      case  6: this.setState ({winddir : "west"}); break;
      case  7: this.setState ({winddir : "north west"}); break;
      case  8: this.setState ({winddir : "north"}); break;
      default: this.setState ({winddir : "minimal"}); break;
    }
  }

  correctCity (city) {
    var cityCorrected = city;
    var lastChar = cityCorrected[cityCorrected.length -1];
    if (lastChar == " ") cityCorrected = cityCorrected.slice (0,-1);
    lastChar = cityCorrected[cityCorrected.length -1];
    if (lastChar == ",") cityCorrected = cityCorrected.slice (0,-1);
    return cityCorrected
  }


  fetchData (cityCorrected) {
    let currentComponent = this;  //this workaround would not be required if using arrow function
    const apiId = this.props.apiId;
    var myFetch = "http://api.openweathermap.org/data/2.5/weather?q=" + cityCorrected + "&appid=" + apiId
      console.log("myFetch~", myFetch)
      fetch (myFetch)
        .then (res => res.json())
       // .then (items => console.log(items))  
        
        .then (function (items) {
          if (items.cod == "200" || items.cod == "404") {
          currentComponent.setState ({
            errorCode : items.cod,
          })
          }
          var temp = items.main.temp - 273.15;
          var hue = 115;
          if (temp < 15) {hue =  185+2*(temp)}
          if (temp < 0) {hue = 185}
          if (temp > 15) {hue =  111-3.5*(temp)}
          if (temp > 50) {hue = 0}
          
          currentComponent.setState ({
          
          wind : [items.wind.deg, items.wind.speed],
          weather : items.weather[0].description,
          temp : Math.round(10*(items.main.temp-273.15))/10,
          myName: items.name,
          sysCountry : items.sys.country,
          hue,
          humidity: items.main.humidity,
          visibility: items.visibility,
          sunset: items.sys.sunset,
          sunrise : items.sys.sunrise,
          longitude: items.coord.lon,
          latitude: items.coord.lat

        }) ; 
        
        })
        .then ((deg) => this.updateWindDirection(deg))
        
        .catch (function (error)  {console.log(">>>Farsing failed,", error); 
          if (error == "TypeError: Failed to fetch") {
            console.log("connection error")
            currentComponent.setState({
              errorCode :"!"
            })
          }
          currentComponent.setState({
          temp: "?"});          return false;}
        );  
          
  }

  setCityName(event) {
    

    this.setState ( {
      cityName : event.target.value
    })

    var cityCorrected = this.correctCity (event.target.value)

    this.fetchData(cityCorrected)
    
  }


  render() {
   

    //display error if API doesn't work
    var errorApi = <div></div>

    if (this.state.errorCode == "404" || this.state.errorCode == "200" ) {}
    else {
        errorApi = 
            <div>
              <p style={{color:"red"}}>The API doesn't work!</p>
            </div>
    }
    if (this.state.errorCode == "!") {
        errorApi =
            <div>
            <p style={{color:"red"}}>The connection to API doesn't work!</p>
            </div> 
    }


    //Welcome text changes to help text, if user has difficulty to find a city
    var welcomeHelpText;
    if (this.state.cityName.length<3) {
      welcomeHelpText = 
          <div>
              <p style={{paddingTop:39}}>Write the name of some city..</p>
          </div>
    }
    else {
      welcomeHelpText = 
        <div>
              <p>Not sure... Specify closer</p>
              <p className="help" >If you can't find your city, use <span style={{color:"#cfc"}}>comma + country code</span> to specify the city.</p>
              <p className="help" >Example: <i>Cartagena<span style={{color:"#cfc"}}>, Co </span></i> will find Cartagena in Colombia</p>
              
              {errorApi}

        </div>
    }
   

    //Bar to show humidity in bottom left corner
    var humidityBar = 
    <div class="animateOpacity" style={{position:"absolute", left:0, bottom:10}}>
      <div style={{position:"absolute", left:0, bottom:20, width: 2*this.state.humidity , height:30}} className = "humidity"></div>
      <div style={{position:"absolute", left:0, bottom:23, width:200, textAlign:"left", paddingLeft:12}} className="humidityText">humidity: {this.state.humidity}%</div>
    </div>


    //response if we don't have a result
    var responseLoading = 
      <div style={{ height:440, position:"relative"}} className="animateOpacity">
            <div style={{width:156, height:156, overflow:"hidden", position: "absolute", top: 54, left:50}}>
                  <Weather description="unknown" />
            </div>

            <div style={{width:156, height:156, overflow:"hidden",  color: "#FEA00C", position: "absolute",top:54, right:50}}> 
                  < Clock longitude={0} latitude={0} placeSet={false}/>
            </div>
            <div className="text">
                 {welcomeHelpText}            
            </div>
    </div>

      var cityNameCropped = this.state.cityName.slice(0,1).toUpperCase() + this.state.cityName.slice(1, this.state.cityName.length)
      var n = cityNameCropped.indexOf(',');
      cityNameCropped = cityNameCropped.substring(0, n != -1 ? n : cityNameCropped.length);
      
    //response if we have a result
    var responseResult = 
        <div className="text" style={{height:440, position:"relative"}}>
            
              <div style={{width:156, height:156, overflow:"hidden", position: "absolute",top:54, left:50}}>
                  <Weather description={this.state.weather} />  
              </div>
            
              <div style={{width:156, height:156, overflow:"hidden",  color: "#FEA00C", position: "absolute",top:54, right:50}}> 
                  < Clock longitude={this.state.longitude} latitude={this.state.latitude} placeSet={true}/>
              </div>

              <p>{cityNameCropped}, {isoCountries[this.state.sysCountry]}</p>
              <p>{this.state.weather} | <span style={{color:  'hsl('+this.state.hue+',80%,60%)'}}>{this.state.temp}°C</span></p>
              <p>{this.state.winddir} wind <img style={{marginLeft:5, paddingBottom:0, marginRight:5, width:22, transform: "rotate("+this.state.wind[0]+"deg)"}} src={arrowUp}></img> | {this.state.wind[1]} m/s</p>
            
              {humidityBar}
              
              <DayNight sunset={this.state.sunset} sunrise={this.state.sunrise}/>
        </div>

 
    // response to search query, either when we have result or don't have result (loading)
    var response;
        if (this.state.temp == "?" || this.state.cityName.length<2) 
              {response = responseLoading}
        else  {response = responseResult} ;


      return (
        <div className="boss" style={{backgroundColor:"black"}}>
            <div className="App">
                <h1 className="weatherHeadline">Weather in 
                    <input id="inputWeather" type="text" style={{width: 100+15*(Math.max(0,this.state.cityName.length-4))}} onChange={this.setCityName}></ input>
                </ h1> 
                {response}
      
            </ div>
        </ div>
    );
  }
}

export default App;
