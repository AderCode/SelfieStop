import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';

export default class Console extends Component {
   render() {
        return (
                <ScrollView style={{ backgroundColor: 'black', height: 300, width: '75%', padding: 10, alignSelf: 'center', borderColor: 'rgb(0, 255, 0)', borderWidth: 2 }}>
                    <Text style={{ color: 'rgb(0, 255, 0)' }}>Console log:</Text>
                    <Text style={{ color: 'rgb(0, 255, 0)' }}>{this.props.log}</Text>
                </ScrollView>
        )
    }

}