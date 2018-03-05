import React, { Component } from "react";
import { ScrollView , WebView, View, StyleSheet, Text, PermissionsAndroid, TouchableNativeFeedback, Alert } from "react-native";
import Map from '../components/Map'

import NearbyPlaceCard from '../components/NearbyPlaceCard'
import { Icon } from "react-native-elements";




export default class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            places: [],
            userLat: 33.515713,
            userLng: 86.808878,
        }
    }

    async requestLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.ACCESS_FINE_LOCATION,
                {
                    'title': 'SelfieStop Location Permission',
                    'message': 'SelfieStop needs access to your location.'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera")
            } else {
                console.log("Camera permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }

    async componentDidMount() {
        let isGpsAllowed = await PermissionsAndroid.check('android.permission.ACCESS_FINE_LOCATION')
        isGpsAllowed ? true : PermissionsAndroid.request('android.permission.ACCESS_FINE_LOCATION', {
            'title': 'SelfieStop Location Permission',
            'message': 'SelfieStop needs access to your location.'
        })
        await this.fetchStops()
        await this.getUserLocation()


    }

    async getUserLocation() {
        await navigator.geolocation.watchPosition(res => {
            this.setState({
                userLat: res.coords.latitude,
                userLng: res.coords.longitude
            })
            console.log("current latLng = ", res.coords.latitude, res.coords.longitude)
        },
            err => {
                console.log("geo err = ", err);
                return
            }, { enableHighAccuracy: true });

    }

    async fetchStops() {
        try {
            let results = await fetch({ url: 'https://powerful-savannah-66747.herokuapp.com/api/stops' });
            let stops = await results.json();
            this.setState({ places: stops })
        } catch (e) {
            console.log("HomeScreen Stops Fetch Error = ", e)
        }
    }

    navigate() {
        this.props.navigation.navigate('Upload')
    }

    render() {
        return (
            <View style={{ flex: 1 }}>


                <View style={styles.map}>
                    <Map region={{
                        latitude: this.state.userLat,
                        longitude: this.state.userLng,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005
                    }}
                        style={{ width: '100%', height: '100%' }}
                        places={this.state.places}
                    />
                </View>
                <ScrollView
                style={styles.container} 
                 > 
                    <View> 
                        <Text onPress={
                            () => Alert.alert('You tapped the button!')} style={{ textAlign: 'center', marginTop: 10, fontSize: 30 }} >
                            Nearby Stops
                        </Text>
                        {this.state.places.map((place, index) => {
                            return <NearbyPlaceCard key={index} place={place}

                            // () => {
                            //     this.setState({newRegion: {
                            //         latitude: this.props.place.lat,
                            //         longitude: this.props.place.lng,
                            //         latitudeDelta: 0.09,
                            //         longitudeDelta: 0.09
                            //     }
                            // })
                            // console.log("doing something")
                            // }
                            />
                        })}
                    </View>
                </ScrollView>
                <View style={styles.root}>
                    <View
                        style={styles.upload}
                    >
                        <Icon
                            name="camera"
                            type="entypo"
                            onPress={() => this.navigate()}
                        />
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: { backgroundColor: "white"},
    root: { alignItems: 'center', flexDirection: 'column' },
    map: {
        backgroundColor: "rgb(230, 230, 230)",
        height: '40%',
        width: '100%',
        borderWidth: 1,
        borderColor: "#000000",
        margin: 0,
        padding: 0
    },
    nearbyCard: { width: '75%' },
    upload: {
        flexDirection: 'row',
        backgroundColor: "lightblue",
        height: 50,
        width: 50,
        margin: 5,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 1
    }
});
