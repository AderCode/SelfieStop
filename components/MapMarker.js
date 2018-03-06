import React, { Component } from "react";
import { View, Text, Image } from 'react-native'
import { Marker, Callout } from 'react-native-maps'

import User from '../images/user.gif'
import StopPin from '../images/stop_pin.png'

class MapMarker extends Component {
    render() {
        let img = StopPin;
        this.props.ico == "user" ? img = User : false
        let $callout;
        if (this.props.steve) {
          
                $callout = <Callout>
                    <View style={{ height: 120, width: 200 }}>
                        <Image source={{ uri: `data:image/jpeg;base64,${this.props.steve}` }} style={{ height: 100, width: 200 }} />
                        <Text style={{ textAlign: 'center' }}>
                            {this.props.title}
                        </Text>
                    </View>
                </Callout>
        
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