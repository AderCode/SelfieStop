import React, { Component } from 'react';
import { View, StatusBar } from 'react-native'
import { StackNavigator } from 'react-navigation'
import LinearGradient from 'react-native-linear-gradient'

import HomeScreen from './screens/HomeScreen'
import UploadScreen from './screens/UploadScreen'

const RootNavigator = StackNavigator({
  Home: { screen: HomeScreen },
  Upload: { screen: UploadScreen }
  },
  { headerMode: 'none' },
  {initialRoute: 'Home'}
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