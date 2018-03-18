import React, { Component } from 'react'
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

import { TabNavigator } from 'react-navigation'

// COMPONENTS
import Loading from '../components/Loading'

// TABS
import MapTab from './tabs/MapTab'
import SearchTab from './tabs/SearchTab'
import AddStopTab from './tabs/AddStopTab'
import DetailsTab from './tabs/DetailsTab'


const TabNavigation = TabNavigator({
    Map: {
        screen: MapTab,
        navigationOptions: {
            swipeEnabled: false,
            tabBarLabel: 'Map',
            tabBarIcon: ({ tintColor }) => <Icon name='map' type="foundation" size={26} style={{ color: tintColor }} />
        }
    },
    AddStop: {
        screen: AddStopTab,
        navigationOptions: {
            swipeEnabled: false,
            tabBarLabel: 'Add Stop',
            tabBarIcon: ({ tintColor }) => <Icon name="add-location" type="materialicons" size={26} style={{ color: tintColor }} />,
            tabBarVisible: "false"
        }
    },
    Search: {
        screen: SearchTab,
        navigationOptions: {
            swipeEnabled: false,
            tabBarLabel: 'Search',
            tabBarIcon: ({ tintColor }) => <Icon name="grid" type="entypo" size={26} style={{ color: tintColor }} />
        }
    },
    Details: {
        screen: DetailsTab,
        navigationOptions: {
            swipeEnabled: false,
            tabBarLabel: 'Details',
            tabBarIcon: ({ tintColor }) => <Icon name="list" type="foundation" size={26} style={{ color: tintColor }} />
        }
    }
}, {
        headerMode: 'none',        // I don't want a NavBar at top
        tabBarPosition: 'bottom',  // So your Android tabs go bottom
        lazy: 'true',
        tabBarOptions: {
            activeTintColor: 'white',  // Color of tab when pressed
            inactiveTintColor: 'grey', // Color of tab when not pressed
            showIcon: 'true', // Shows an icon for both iOS and Android
            activeBackgroundColor: 'black',
            showLabel: false, //No label for Android
            labelStyle: {
                fontSize: 11,
            },
            style: {
                backgroundColor: 'white',
                height: 50 // I didn't use this in my app, so the numbers may be off. 
            }
        }
    });

export default class MainScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            places: [],
            userLat: 33.515713,
            userLng: -86.808878,
            isLoaded: false,
            stopId: null,
            stop: {}
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
        await this.handleFetchStop()
        await this.setState({ isLoaded: true })


    }

    async getUserLocation() {
        await navigator.geolocation.watchPosition(res => {
            this.setState({
                userLat: res.coords.latitude,
                userLng: res.coords.longitude
            })
        },
            err => {
                // console.log("geo err = ", err);
                return
            }, { enableHighAccuracy: true });

    }

    async fetchStops() {
        try {
            let apiUrl = 'https://powerful-savannah-66747.herokuapp.com/api/stops'
            let ipUrl = 'https://smjetissah.localtunnel.me/api/stops'
            let results = await fetch({ url: apiUrl });
            let stops = await results.json();
            this.setState({ places: stops })
            // console.log(stops)
        } catch (e) {
            // console.log("HomeScreen Stops Fetch Error = ", e)
        }
    }

    async stopDetails(stopId) {
        await this.setState({stopId})
        await this.handleFetchStop(stopId)
    }

    async handleFetchStop(id) {
       if (id) {
            await this.fetchOneStop(id)
        } else {
            let i = Math.floor(Math.random() * this.state.places.length)
            this.setState({ stop: this.state.places[i] })
        }
    }

    async fetchOneStop(id) {
        try {
            let apiUrl = `https://powerful-savannah-66747.herokuapp.com/api/stops/${id}`
            let ipUrl = `https://smjetissah.localtunnel.me/api/stops/${id}`
            let result = await fetch({ url: apiUrl });
            let stop = await result.json();
            await this.setState({ stop })
            // console.log('stop = ', stop)
        } catch (e) {
            // console.log("MainScreen Stop Fetch Error = ", e)
        }
    }

    navigate(screen) {
        this.props.navigation.navigate(screen)
    }

    render() {
        // console.log('1', this.state.stop)
        return this.state.isLoaded ? <TabNavigation screenProps={{ mainState: this.state, stopDetails: this.stopDetails.bind(this), navigate: this.navigate.bind(this) }} /> : <Loading />
    }
}