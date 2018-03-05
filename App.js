import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation'
import HomeScreen from './screens/HomeScreen'
import UploadScreen from './screens/UploadScreen'

const RootNavigator = StackNavigator({
  Home: { screen: HomeScreen }
  },{
  headerMode: 'none'
  }
  );

export default class App extends Component {
  render() {
    return (
      <RootNavigator />
    );
  }
}