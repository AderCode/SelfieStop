import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation'
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
      <RootNavigator />
    );
  }
}