import styled from 'styled-components'
import { theme1 } from './../theme/globalStyle'
import { media } from './../constants/media';

import humidityImage from '../images/humidity.jpg'
import backgroundImage from '../images/castle.png'

const Body = styled.body`
    
    width: 100%; height: 100%;  position: absolute; top: 0; left: 0;
    ${media.big `background-color: black`}
`

const Input = styled.input`
    font-weight: 400;
    padding : 0.6em 0.3em 0.5em 0.2em;
    margin: 0.3em;
    color: ${props => props.inputColor || theme1.dark};
    background: ${theme1.backgroundLight};
    height: 1em;
    border-radius: 3px;
    width: ${({ sizeValue }) => sizeValue + 'px'};
    text-transform:capitalize; 
`;


const Title = styled.h1`
    margin-top:2em; padding-top: 1em; padding-bottom: 1em; 
    background-color: white;
    text-align: center;
    color: ${props => props.primary ? 'blue' : 'black'}
    ${media.big `margin-top: 0em;`}
   

`;

const Main = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    height: 560px;
    background: black;
    z-index: 10;
    position:relative;
    ${media.medium `height: 711px;`}
    ${media.small `height:993px;`}
    ${media.tiny `height:900px;`}
`



const ResponseBody = styled.div `
  position: relative;
  z-index: initial;
  background-image: url(${backgroundImage});
  background-repeat: no-repeat;
  height: 410px;
  background-position: bottom; 
  color: white
  text-align: center;
  margin-bottom: 1em;
  ${media.medium `height: 600px;`}
  ${media.small `height:670px;`}
  ${media.tiny `height:auto;`}

`

const WeatherTime = styled.div `
${media.medium ` 
width: 100%;
height: auto;`}
`

const WeatherImage = styled.div `
float:left;
width: 25%;
${media.big`width: 30%;`}
${media.medium`width: 50%;`}
${media.small`width: 100%; height: auto;`}
`

const Time = styled.div `
float: right;
width: 25%;
padding-right:15px;
${media.big`width: 30%;`}
${media.medium`width: 50%;`}
${media.small`width: 100%; height: auto;`}
`

const ResponseText = styled.div `
float:left;
width: 50%;
color:white;
padding: 0px;
${media.big`width: 40%;`}
${media.medium `width: 100%; height: auto;`}
${media.small`width: 100%; height: auto;`}
`

//clock

const ClockContainer = styled.div `

padding-top:22px;
${media.small`width: 100%; height: auto;`}
`
const ClockComponent = styled.div `
padding-bottom: 0em;
font-size: 4em;
color: #FEA00C;
line-height: 1em;

`

//daynight

const HumidityWrapper = styled.div `
width: 30%;
float: left;
height: 66px;

${media.small`margin: 0 auto; float: none`}

`

const HumidityComponent = styled.div `

`

const HumidityText = styled.div `
/*width : 200px;*/
text-align : "left";
padding-left : 12px;
opacity : 0.9;
font-size: 19px;
position : absolute;
bottom : 2px;
z-index:20;
${media.small`color: white; opacity:1; font-weight:777`}
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
const Footer = styled.div `
position: relative;
margin-top:10px;
width: 100%;
height: 100px;
${media.small`height: 50px `}
`

//Weather

const WeatherImageContainer = styled.div `
width: 100%;
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

const SectionBlack = styled.section `
background : black;
z-index: -1;
position:relative;
padding-bottom:13px;
`


export {Body, Input, Title, Main, ResponseBody, WeatherTime, WeatherImage, Time, ResponseText, WeatherImageContainer, WeatherImageWrapper, WeatherImg, ClockContainer, ClockComponent, HumidityWrapper, HumidityComponent, HumidityText, HumidityGraph, DayNightWrapper, DayNightComponent, Footer, WindWrapper, WindDirectionImg, SectionBlack}