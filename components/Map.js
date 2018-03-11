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
                region={this.props.region}
            >
                {this.props.mainState.places.map((marker, index) => (
                    <MapMarker
                        key={index}
                        latitude={Number(marker.lat)}
                        longitude={Number(marker.lng)}
                        title={marker.name}
                        description={marker.description}
                        img={marker.imgurl}
                        navigation={this.props.navigation}
                        stopId={marker.id}
                        stopDetails={this.props.stopDetails}
                    />
                ))}

                <MapMarker
                    latitude={this.props.region.latitude}
                    longitude={this.props.region.longitude}
                    title={"You"}
                    description={"You are here."}
                    ico={'user'}
                />



            </MapView>
        )
    }

}


export default Map;