import React, { Component } from "react";
import MapView from 'react-native-maps';

import MapMarker from './MapMarker';

import User from '../images/user.gif';
import StopPin from '../images/stop_pin.png';

class Map extends Component {
    constructor(props) {
        super(props);
    }

    // componentDidMount() {
    //  let markers = this.props.places;
    //  this.setState({ markers })
    // }

    render() {
        console.log("props", this.props)
        return (
            <MapView style={this.props.style}
                initialRegion={{
                    latitude: 33.515713,
                    longitude: 86.808878,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001
                }}
                region={this.props.region}
                showsPointsOfInterest={false}
                animateToRegion={{region: this.props.newRegion, duration: 500}}
            >

                <MapMarker
                    latitude={this.props.region.latitude}
                    longitude={this.props.region.longitude}
                    title={"You"}
                    description={"You are here."}
                    ico={'user'}
                />

                {this.props.places.map((marker, index) => (
                    <MapMarker
                        key={index}
                        latitude={Number(marker.lat)}
                        longitude={Number(marker.lng)}
                        title={marker.name}
                        description={marker.description}
                    />
                ))}



            </MapView>
        )
    }

}


export default Map;