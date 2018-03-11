import React, { Component } from "react";
import { View, Text, Image, Linking } from 'react-native'
import { Marker, Callout } from 'react-native-maps'

import User from '../images/user.gif'
import StopPin from '../images/stop_pin.png'

class MapMarker extends Component {

    async showStopDetails(id) {
        await this.props.stopDetails(id)
        await this.props.navigation.navigate('Details')
    }

    render() {
        let img = StopPin;
        this.props.ico == "user" ? img = User : false
        let $callout;
        if (this.props.img) {
          
                $callout = <Callout
                // onPress={()=> Linking.openURL(`http://maps.google.com/maps?daddr=${this.props.latitude},${this.props.longitude}`)}
                onPress={() => this.showStopDetails(this.props.stopId)}
                >
                    <View style={{ height: 120, width: 200 }}>
                        <Image source={{ uri: `${this.props.img}` }} style={{ height: 100, width: 200 }} />
                        <Text style={{ textAlign: 'center' }}>
                            {this.props.title}
                        </Text>
                    </View>
                </Callout>
                console.log(this.props.img)
        
        }
        return (
            <Marker
                coordinate={{
                    latitude: this.props.latitude,
                    longitude: this.props.longitude
                }}
                title={this.props.title}
                description={this.props.description}
                image={img}
            >
                {$callout}
            </Marker>
        )
    }

}


export default MapMarker;