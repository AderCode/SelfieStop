import React, { Component } from 'react';
import { View, StatusBar } from 'react-native'
import { StackNavigator } from 'react-navigation'
import LinearGradient from 'react-native-linear-gradient'

//Screens
import MainScreen from './screens/MainScreen'
import UploadScreen from './screens/UploadScreen'
import SplashScreen from './screens/SplashScreen'

const RootNavigator = StackNavigator({
  Splash: { screen: SplashScreen },
  Main: { screen: MainScreen }
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
            backgroundColor="black"
            hidden = {false}/>
      <RootNavigator />
     </View>
    );
  }
}