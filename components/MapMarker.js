import React, { Component } from "react";
import { Marker } from 'react-native-maps'

import User from '../images/user.gif'
import StopPin from '../images/stop_pin.png'

class MapMarker extends Component {
    render() {
        let img = StopPin;
        this.props.ico == "user" ? img = User : false
        return (
            <Marker
                coordinate={{
                    latitude: this.props.latitude,
                    longitude: this.props.longitude
                }}
                title={this.props.title}
                description={this.props.description}
                image={img}
            />
        )
    }

}


export default MapMarker;