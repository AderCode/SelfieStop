import React, { Component } from 'react';
import { View, StatusBar } from 'react-native'
import { StackNavigator } from 'react-navigation'
import LinearGradient from 'react-native-linear-gradient'

//Screens
import HomeScreen from './screens/HomeScreen'
import UploadScreen from './screens/UploadScreen'
import SplashScreen from './screens/SplashScreen'

const RootNavigator = StackNavigator({
  Splash: { screen: SplashScreen },
  Upload: { screen: UploadScreen }, // Home should be on this line!!!
  Home: { screen: HomeScreen }
  },
  { headerMode: 'none' },
  {initialRoute: 'Splash'}
  );

export default class App extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
      <StatusBar 
            barStyle = "light-content"
            backgroundColor="#0084FF"
            hidden = {false}/>
      <RootNavigator />
     </View>
    );
  }
}