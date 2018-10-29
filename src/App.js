import React, { Component } from 'react';
import Clock from './modules/clock';
import Weather from './modules/weather';
import DayNight from './modules/daynight';
import Humidity from './modules/humidity';
import Wind from './modules/wind';
import ResponseModule from './modules/responseModule';

import { theme1 } from './theme/globalStyle'
import {ThemeProvider } from 'styled-components'

import './css/App.css';
import {WelcomeHome, Page, BackgroundHolder, Header, Footer, Monday, Input, Title, Main, WeatherImageContainer, ResponseWrapper} from './components/components'






class App extends Component {

  constructor(props){
    super (props);
    this.state = {
      temp : "?",
      responseCode :"?",
      cityName: "",    // store name of city written in input field
      name : "",      // store name of the city of displayed result, to verify if it is the same name as user's input (in case he deletes characters)
      weatherData : {'name' : 0}
    }

    this.setCityName = this.setCityName.bind(this)
  }
  
  correctCity (city) { // remove comma and whitespace from the end of user's input - to minimalize 404 API response
   
    var cityNameCorrected = city.trim();
    var lastChar = cityNameCorrected[cityNameCorrected.length -1];
    if (lastChar == ",") cityNameCorrected = cityNameCorrected.slice (0,-1);
    return cityNameCorrected.trim()
  }


  tryToUpdateItems(weatherData) {
    
    // This is needed because responses from API are coming in unordered manner and they are not labeled, as of what response comes from which request. 
    //So we only set a new weather data if returned name of the city matches the name in the input (with consideration to country code that goes after comma.)
    if (weatherData.cod === 200) {
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
      else  if (weatherData.cod == 404) { //if 404 code, lets see if we need to remove data displayed if they no longer correspond to users query
            setTimeout (() => {this.wipeResults()}, 1)
            console.log ("Wiping out weather data")
      }
      else {
        console.log ("Different response code. ", )
      }
    }


    wipeResults () {

      try { 
          // need to extract city from city + country string
          var cityString = this.state.cityName
          var splitted = cityString.split(",")
          var city = splitted[0].trim()
          
          if ((city.toLowerCase()  != this.state.name.toLowerCase()) ) {
            console.log ("Input does not correspond to what we show! Deleting results..")
            this.setState({ weatherData : {'name' : 0}})
          }
        }
        catch(err) {}
    }
 

  fetchData (cityNameCorrected) {
    let currentComponent = this; 
    const apiId = this.props.apiId;
    var fetchURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityNameCorrected + "&appid=" + apiId
      console.log("Fetching URL: ", fetchURL)
      fetch (fetchURL)

        .then (res => res.json())
       // .then (items => console.log(items))  
        
        .then (function (items) {
          
          currentComponent.setState ({
            responseCode : items.cod,})
            
          console.log ("fetching items... ")
          
          currentComponent.tryToUpdateItems(items)
              
          console.log(items.cod)
          
        })
        
        
        .catch (function (error)  {console.log(">>>fetching failed,", error); 
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
  };


  render() {
      
     //display error if API doesnt work
    var errorApi = <div></div>

    if (this.state.responseCode == 404 || this.state.responseCode == 200 ) {}
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
          <WelcomeHome>
              <p>Not sure... Specify closer</p>
              <p className="help" >If you can not find your city, use <span style={{color:"#cfc"}}>comma + country code</span> to specify the city.</p>
              <p className="help" >Example: <i>Ibiza<span style={{color:"#cfc"}}>, Es </span></i> will find Ibiza in Spain</p>
              
              {errorApi}

          </WelcomeHome>
    }
   

    var titleEl = 
     <Title>Weather in 
                       
         <Input sizeValue={120+18*(Math.max(0,this.state.cityName.length-4))} type="text" onChange={this.setCityName}/>
 
     </Title>
      
    if (this.state.weatherData.name.length>1) {

        return (
<ThemeProvider theme={theme1}>
        
  <Page>
    
    <Header>
      {titleEl}
    </Header>

    <BackgroundHolder>
        <Main>
            <ResponseWrapper>
                <ResponseModule   weatherData={this.state.weatherData} />
                <Wind weatherData={this.state.weatherData} />

             </ResponseWrapper>
     
     
        <WeatherImageContainer>
            <Weather description={this.state.weatherData.weather[0].description} />                     
        </WeatherImageContainer>

     
        <Clock longitude={this.state.weatherData.coord.lon} latitude={this.state.weatherData.coord.lat} placeSet={true}/>                  
                             

        </Main>


        <Footer>
      
            <Humidity humidity={this.state.weatherData.main.humidity}/>
  
            <Monday>  
            <DayNight sunset={this.state.weatherData.sys.sunset} sunrise={this.state.weatherData.sys.sunrise} />
            </Monday>

        </Footer>


    </BackgroundHolder>
  </Page>
</ThemeProvider>

)}

    else {
        return (
<ThemeProvider theme={theme1}>
        
  <Page>
    
    <Header>
      {titleEl}
     </Header>
    
    <BackgroundHolder>
        <Main>
            <ResponseWrapper>
              {welcomeHelpText}       
            </ResponseWrapper>


            <WeatherImageContainer>
              <Weather description={"unknown"} />
            
            </WeatherImageContainer>
        
              
            <Clock longitude={0} latitude={0} placeSet={false}/>                  
      
        </Main>


    </BackgroundHolder>
   
   
    <Footer>
       
    </Footer>

  </Page>
</ThemeProvider>
        )
      }
  }
}

export default App;

