import React from "react";
import {Alert} from "react-native";
import Loading from './Loading';
import Weather from './Weather';
import * as Location from "expo-location";
import axios from "axios";

const APIkey = '71a674751eee8d44165e6ca5488d37a0';


export default class extends React.Component {
  state = {
    isLoading: true
  }
  getWeather = async (latitude, longitude) => {
    const {data} = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIkey}&units=metric`
    );
    console.log(data);
    this.setState({isLoading:false, temp: data.main.temp});
  };
  getLocation = async () => {
    try{
      await Location.requestForegroundPermissionsAsync();
      const { 
        coords: {latitude, longitude} 
      } = await Location.getCurrentPositionAsync();
      //Send to API and get weather
      this.getWeather(latitude, longitude);
      this.setState({isLoading: false});
    } catch (e){
        Alert.alert("Can't find you.", " So sad");
    }
  };
  componentDidMount(){
    this.getLocation();
  }
  render(){
    const { isLoading, temp } = this.state;
    return isLoading ? <Loading /> : <Weather temp={Math.round(temp)} />; //소숫점 지워줌,
  }
};
