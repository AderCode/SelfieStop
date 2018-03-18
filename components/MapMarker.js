import React, { Component } from "react";
import { View, Text, Image, WebView } from 'react-native'
import { Marker, Callout } from 'react-native-maps'

import User from '../images/user.gif'
import StopPin from '../images/stop_pin.png'

import TempImg from '../images/img.jpg'

class MapMarker extends Component {

    async showStopDetails(id) {
        await this.props.stopDetails(id)
        await this.props.navigation.navigate('Details')
    }

    render() {
        // console.log('props', this.props)
        let img = StopPin;
        this.props.ico == "user" ? img = User : false
        let $callout;
        if (this.props.img) {
            $callout =
                <Callout
                    onPress={() => this.showStopDetails(this.props.stopId)}
                    tooltip={true}
                >
                    <View style={{ height: 120, width: 200 }}>
                        <WebView
                            source={{ html:
                                 `<img src="${this.props.img}" width="183" height="90" />` 
                                }}
                            style={{ height: 100, width: 200, alignSelf: 'center' }}
                            scrollEnabled={false}
                        />
                        <Text style={{ textAlign: 'center', backgroundColor: 'white' }}>
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