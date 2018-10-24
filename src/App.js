import React, { Component } from 'react';
import Clock from './modules/clock';
import Weather from './modules/weather';
import DayNight from './modules/daynight';
import Wind from './modules/wind';

import ResponseModule from './modules/responseModule';

import './css/App.css';




class Layout extends Component {

  constructor(props){
    super (props);
  }

  render(){
    return (
    <div className="main">
        <div className="headline">
            Weather in... 
        </div>    

        <div className="responseBody">
           <section>
                <div className = "watherTime">
                    <div className="weatherImage">
                        weatherImage
                    </div>
                  
                    <div className="time">
                        time
                    </div>
                </div>

                 <div className="responseText">
                    responseText
                </div>
            </section>
        </div>
    </div>
    )
  }
  
    
}

class App extends Component {

  constructor(props){
    super (props);
    this.state = {
      wind: [], //delete
      winddir : "unknow",
      temp : "?",
      weather : "",
      responseCode :"?",
      cityName: "",
      myName: "",
      hue: 100,
      name : "",
      humidity:0,
      visibility:0, 
      coordinates : {"longitude" : 0,
                      "latitude" : 0},
      
      weatherData : {'name' : 0}
    }

    this.setCityName = this.setCityName.bind(this)
  }


  correctCity (city) { // remove comma and whitespace from the end of user's input - to minimalize 404 API response
    var cityNameCorrected = city;
    var lastChar = cityNameCorrected[cityNameCorrected.length -1];
    if (lastChar == " ") cityNameCorrected = cityNameCorrected.slice (0,-1);
    lastChar = cityNameCorrected[cityNameCorrected.length -1];
    if (lastChar == ",") cityNameCorrected = cityNameCorrected.slice (0,-1);
    return cityNameCorrected
  }

  tryToUpdateItems(weatherData) {
    
    if (weatherData.cod == "200") {
        if (weatherData.name.length > 1) {
            console.log("city name: ", this.state.cityName , "weather Data: ", weatherData)

            // need to extract city from city + country string
            var cityString = this.state.cityName
            var splitted = cityString.split(",")
            var city = splitted[0].trim()
            if (splitted.length>1) {var country = splitted[1].trim()} else {var country = weatherData.sys.country}

            if ((city.toLowerCase()  == weatherData.name.toLowerCase()) && (country.toLocaleLowerCase() == weatherData.sys.country.toLowerCase()) ) {
              console.log ("Its a MATCH!")
              this.setState({
                weatherData,
                name : weatherData.name
              })
            }
          }
    }
      else  if (weatherData.cod == "404") { //404?
            setTimeout (() => {this.wipeResults(weatherData)}, 1)

      }
    }

    wipeResults (weatherData) {

      try { 
          // need to extract city from city + country string
          var cityString = this.state.cityName
          var splitted = cityString.split(",")
          var city = splitted[0].trim()
          

          if ((city.toLowerCase()  != this.state.name.toLowerCase()) ) {
            console.log ("Input doesn't correspond to what we show! Deleting results..")
            this.setState({ weatherData : {'name' : 0}})
          }
        }
        catch(err) {console.log(err)}
    }
 


  fetchData (cityNameCorrected) {
    let currentComponent = this; 
    const apiId = this.props.apiId;
    var fetchURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityNameCorrected + "&appid=" + apiId
      console.log("myFetch~", fetchURL)
      fetch (fetchURL)
        .then (res => res.json())
       // .then (items => console.log(items))  
        
        .then (function (items) {
          if (items.cod == "200" || items.cod == "404") {
          currentComponent.setState ({
            responseCode : items.cod,
            
          })
          }
          console.log ("fetching... ")
          
          currentComponent.tryToUpdateItems(items)
              
          
          console.log(items.cod)
          console.log(items)
          
        })
        
        
        .catch (function (error)  {console.log(">>>Farsing failed,", error); 
          if (error == "TypeError: Failed to fetch") {
            console.log("connection error")
            currentComponent.setState({
              responseCode :"!"
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

    var cityNameCorrected = this.correctCity (event.target.value)

    this.fetchData(cityNameCorrected)
    
    if (event.target.value.length<3) { this.setState({weatherData : {'name' : 0}})} else {this.fetchData(cityNameCorrected)}
  }


  render() {
   

    //display error if API doesnt work
    var errorApi = <div></div>

    if (this.state.responseCode == "404" || this.state.responseCode == "200" ) {}
    else {
        errorApi = 
            <div>
              <p style={{color:"red"}}>The API does not work!</p>
            </div>
    }
    if (this.state.responseCode == "!") {
        errorApi =
            <div>
            <p style={{color:"red"}}>The connection to API does not work!</p>
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
   

    

/*
    //response if we don't have a result
    var responseLoading = 
      <div className="animateOpacity responseBody">
            
            <Weather description="unknown" />
            
            < Clock longitude={0} latitude={0} placeSet={false}/>
            
            <div className="responseText">
                 {welcomeHelpText}            
            </div>
    </div>

      var cityNameCropped = this.state.cityName.slice(0,1).toUpperCase() + this.state.cityName.slice(1, this.state.cityName.length)
      var n = cityNameCropped.indexOf(',');
      cityNameCropped = cityNameCropped.substring(0, n != -1 ? n : cityNameCropped.length);
      
    //response if we have a result
    var responseResult = 
        <div className="text responseBody" >
            
              
              <Weather description={this.state.weather} />  
            
              <Clock longitude={this.state.longitude} latitude={this.state.latitude} placeSet={true}/>
              

              <p>{cityNameCropped}, {isoCountries[this.state.sysCountry]}</p>
              <p>{this.state.weather} | <span style={{color:  'hsl('+this.state.hue+',80%,60%)'}}>{this.state.temp}°C</span></p>
              <p>{this.state.winddir} wind <img style={{marginLeft:5, paddingBottom:0, marginRight:5, width:22, transform: "rotate("+this.state.wind[0]+"deg)"}} src={arrowUp}></img> | {this.state.wind[1]} m/s</p>
            
              {humidityBar}
              
              <DayNight sunset={this.state.sunset} sunrise={this.state.sunrise}/>
        </div>
*/
 
    // response to search query, either when we have result or don't have result (loading)
    /*var response;
        if (this.state.temp == "?" || this.state.cityName.length<2) 
              {response = responseLoading}
        else  {response = responseResult} ;
*/

     console.log ("name : ", this.state.weatherData.name)
    if (this.state.weatherData.name.length>1) {
    return (
      <div className="main">
          <div className="App">
            <h1 className="weatherHeadline headline">Weather in 
                    <input id="inputWeather" type="text" style={{width: 100+15*(Math.max(0,this.state.cityName.length-4))}} onChange={this.setCityName}></ input>
                </ h1>    
      
              <div className="responseBody text">
                <section>
                    
                
                      <div className = "watherTime">
                          <div className="weatherImage">
                              <Weather description={this.state.weatherData.weather[0].description} />
                          </div>
                        
                          <div className="time">
                              <Clock longitude={this.state.weatherData.coord.lon} latitude={this.state.weatherData.coord.lat} placeSet={true}/>
                  
                          </div>
                      </div>
                      
                      <div className="responseText">
                      
                       <ResponseModule   weatherData={this.state.weatherData}  cityName={this.state.cityName} />
                        
                      </div>
                     
                  </section>
                   <Wind weatherData={this.state.weatherData} />
                 
                  
                  <DayNight sunset={this.state.weatherData.sys.sunset} sunrise={this.state.weatherData.sys.sunrise} humidity={this.state.weatherData.main.humidity}/>
              </div>
          </div>
      </div>
      )}

      else {
        return (
          <div className="main">
          <div className="App">
            <h1 className="weatherHeadline headline">Weather in 
                    <input id="inputWeather" type="text" style={{width: 100+15*(Math.max(0,this.state.cityName.length-4))}} onChange={this.setCityName}></ input>
                </ h1>    
      
              <div className="responseBody text">
                <section>
                    
                
                      <div className = "watherTime">
                          <div className="weatherImage">
                              <Weather description="unknown"/>
                          </div>
                        
                          <div className="time">
                              <Clock longitude="0" latitude={0} placeSet={false}/>
                  
                          </div>
                      </div>
                      
                      <div className="responseText">
                      
                      {welcomeHelpText}
                        
                      </div>
                     
                  </section>
                  
              </div>
          </div>
      </div>
        )
      }


      


  }
}

export default App;
//export default Layout;