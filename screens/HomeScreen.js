import React, { Component } from "react";
import {
    ScrollView,
    View,
    StyleSheet,
    Text,
    PermissionsAndroid,
    TouchableNativeFeedback,
    Alert,
    StatusBar
} from "react-native";
import { Icon } from "react-native-elements";
import ImagePicker from 'react-native-image-picker'
import LinearGradient from 'react-native-linear-gradient'

import Map from '../components/Map'
import NearbyPlaceCard from '../components/NearbyPlaceCard'
import NavBar from '../components/NavBar'

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

    cam() {
        ImagePicker.launchCamera(options, (response) => { });
    }

    navigate(screen) {
        this.props.navigation.navigate(`${screen}`)
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'grey' }}>
               
                    <View style={{
                        backgroundColor: '#0084FF',
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        borderColor: 'black',
                        borderBottomWidth: 2.5,
                        padding: 2,
                    }}>
                        <Text onPress={
                            () => Alert.alert('You tapped the button!')} 
                            style={{ alignSelf: 'center', 
                            fontSize: 40, 
                            color: 'white', 
                            }}>
                            Nearby Stops
                        </Text>
                        {/* <TouchableNativeFeedback
                        onPress={() => { return }}>
                            <Icon
                            name="list"
                            type="foundation"
                            size={50}
                        />
                        </TouchableNativeFeedback> */}
                    </View>
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
                {/* <ScrollView
                    style={styles.container}
                >
                    <View style={{ backgroundColor: 'transparent' }}>

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
                </ScrollView> */}
                
                    <View style={{
                        backgroundColor: '#0084FF',
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        borderColor: 'black',
                        borderTopWidth: 2.5,
                        padding: 2,
                    }}>
                        <TouchableNativeFeedback
                        onPress={() => this.navigate('Upload')}>
                        <Icon
                            name="add-location"
                            type="materialicons"
                            size={50}
                            underlayColor={'rgb(3, 0, 255)'}
                        />
                        </TouchableNativeFeedback>

                        <TouchableNativeFeedback
                        onPress={() => this.cam()}>
                        <Icon
                            name="camera"
                            type="entypo"
                            size={50}
                            underlayColor={'rgb(3, 0, 255)'}
                        />
                        </TouchableNativeFeedback>

                        {/* <TouchableNativeFeedback
                        onPress={() => this.getUserLocation()}>
                            <Icon
                            name="my-location"
                            type="materialicons"
                            size={50}
                        />
                        </TouchableNativeFeedback> */}
                    </View>
     </View>
        );
    }
}
const styles = StyleSheet.create({
    container: { backgroundColor: "transparent" },
    map: {
        backgroundColor: "transparent",
        height: '80.5%',
        width: '98%',
        borderWidth: 2,
        borderColor: "black",
        margin: 5,
        alignSelf: 'center'
    },
});
