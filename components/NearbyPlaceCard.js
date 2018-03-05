import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';


export default class NearbyPlaceCard extends Component {


    render() {
        return (
            <Card
                featuredTitle={this.props.place.name}
                featuredTitleStyle={{textShadowColor: "black", textShadowOffset: {width: 2, height: 2}, textShadowRadius: 1}}
                image={require('../images/img.jpg')}
                wrapperStyle={{padding: 0, flex: 1 }}  
                />
        )
    }

}

