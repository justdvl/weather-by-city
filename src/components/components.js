import styled from 'styled-components'
import { theme1 } from './../theme/globalStyle'
import { media } from './../constants/media';

import humidityImage from '../images/humidity.jpg'
import backgroundImage from '../images/castle.png'

const Page = styled.div `
    height: 100%;
    display: flex; /*flex superpowers activated! */
    flex-direction: column; 
    width: 1000px;
    margin: 0 auto;
    ${media.big `width: 100%;
    margin: 0 auto;`}
    ${media.small `background: black;`}
`



const Input = styled.input`
    font-weight: 400;
    padding : 0.6em 0.3em 0.5em 0.2em;
    margin: 0.3em;
    color: ${props => props.inputColor || theme1.dark};
    background: ${theme1.backgroundLight};
    height: 1.3em;
    border-radius: 3px;
    width: ${({ sizeValue }) => sizeValue + 'px'};
    text-transform:capitalize; 
`;


const Title = styled.h1`
   
    text-align: center;
    color: ${props => props.primary ? 'blue' : 'black'}

`;

const Header = styled.div`
    flex: 0 0 185px;
    align-self: center;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
    background: #FBB242;
`

const Main = styled.div`
    flex: 1 0 auto; /*fill the available space*/
    display: flex; /*I just included this! - now a flex container with flex items: sidebar & main content section*/
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;

    background-repeat: no-repeat;
    background-position: bottom;
    align-content: flex-start;
`




const WeatherTime = styled.div `
    ${media.medium ` 
    width: 100%;
    height: auto;`}
`

const WeatherImage = styled.div `
    ${media.big`width: 30%;`}
    ${media.medium`width: 50%;`}
    ${media.small`width: 100%; height: auto;`}
`



const ResponseWrapper = styled.div `
    margin-top: 22px;
    align-self: flex-start;
    flex: 100 0 300px;
    order: 2;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    ${media.medium`order : 3;  padding-left: 5%; padding-right: 5%;`}
    ${media.small`flex: 0 0 100%; order: 3; margin-top: 10px;`}
`

//clock

const ClockContainer = styled.div `
    margin-top: 30px;
    padding-top:15px;
    padding-right: 1em;
    align-self: flex-start;
    flex: 5 0 190px;
    order : 3;
    text-align: center;
    color: #ddd;
    ${media.medium`order : 2;  flex: 10 0 190px;`}
    ${media.small`flex: 0 0 100%; order: 2; margin-top: 2px;`}
`


const ClockComponent = styled.div `
    padding-bottom: 0em;
    font-size: 4em;
    color: #FEA00C;
    line-height: 1em;
`

//daynight


const HumidityComponent = styled.div `
    display: flex;
    flex: 0 0 190px;
    position: relative;
    ${media.small`margin-top: 2em; `}
`

const HumidityText = styled.div `
    width : 200px;
    text-align : "left";
    padding-left : 12px;
    opacity : 0.9;
    font-size: 19px;
    position : absolute;
    bottom : 2px;
    z-index:2;
    ${media.small`color: white; opacity:1; `}
`

const HumidityGraph = styled.div `
    width : ${({humidityWidth}) => humidityWidth + 'px'};
    height: 30px;
    background-image: url(${humidityImage});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
    overflow: hidden;
    position :absolute;
    bottom:0px;
    z-index:1;
`

const Monday = styled.div `
    display: flex;
    flex: 0 0 170px;
    text-align: center;
    ${media.small`margin: auto; padding-bottom: 1.2em; margin-top: 15px; `}
`

const DayNightWrapper = styled.div `
    width: 30%;
    float: right;
    ${media.small`width: 100%; `}
`

const DayNightComponent = styled.div `
    float: right;
    padding: 0px 10px 0px 10px;
    ${media.small`float:none; `}

`

const NightWrapper = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 1.2em;
    justify-content: space-around;
    text-align: center;
    ${media.small `margin: auto; padding-bottom: 1.2em; margin-top: 15px;`}
    `

const Footer = styled.div `
    flex: 0 0 170px;
    color: #fff;
    display: flex;
    justify-content: space-between;
    padding-bottom: 3em;
    flex-wrap: wrap;
    ${media.small`  flex: 1 0 200px;  margin-bottom:1em; `}
`

const BackgroundHolder = styled.div `
    background-color: black;
    background-image: url(${backgroundImage});
    background-position: bottom;
    background-repeat: no-repeat;
    min-height: 415.13px;
    ${media.small`  height:100%; `}

`

//Weather

const WeatherImageContainer = styled.div `
    width: 100%;
    margin-top: 30px;
    align-self: flex-start;
    flex: 10 0 190px;
    order: 1;
    ${media.small`flex: 0 0 100%; order: 1; `}
`

const WeatherImageWrapper = styled.div `
    width:156px; 
    height:156px; 
    overflow:hidden;
    position:relative;
    margin: auto; 
`

const WeatherImg = styled.img `
    position:absolute;
    left: -5px;
    top: ${({topVariable}) => topVariable + "px" }
`

//Wind
    const WindWrapper = styled.div `
    width:100%;
    text-align: center;
`

const WindDirectionImg = styled.img `
    margin-left: 9px; 
    padding-bottom: 0px;
    margin-right: 5px; 
    width: 22px; 
    transform: ${({deg}) => "rotate("+ deg + "deg)"}
`

const WelcomeHome = styled.div `
    text-shadow: 0 0 5px #111, 0 0 10px #111, 0 0 15px #fff, 0 0 20px #111, 0 0 35px #111;
    font-size:1.4em;
    text-align: center;
`



export {WelcomeHome, Page, NightWrapper, BackgroundHolder, Header, Monday, Input, Title, Main, ResponseWrapper, WeatherTime, WeatherImage, WeatherImageContainer, WeatherImageWrapper, WeatherImg, ClockContainer, ClockComponent, HumidityComponent, HumidityText, HumidityGraph, DayNightWrapper, DayNightComponent, Footer, WindWrapper, WindDirectionImg}