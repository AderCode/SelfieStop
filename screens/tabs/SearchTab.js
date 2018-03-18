import React, { Component } from 'react'
import {
    ScrollView,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    Dimensions
} from 'react-native'
import { Icon } from 'react-native-elements'

import Logo from '../../images/placeLogo.png'

export default class SearchTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            unit: 'M',
            stops: [],
            isSorted: false,
            dims: {},
            search: ''
        }

    }

    async componentDidMount() {
        await this.getDimensions();
        await this.checkNearby(this.props.screenProps.mainState.places);
        await this.searchResults();
        await this.setState({ isSorted: true })
    }


    distance(userLat, userLng, stopLat, stopLng, unit) {
        let userLatRadian = Math.PI * userLat / 180;
        let stopLatRadian = Math.PI * stopLat / 180;
        let theta = userLng - stopLng;
        let thetaRadian = Math.PI * theta / 180;
        let dist = Math.sin(userLatRadian) * Math.sin(stopLatRadian) + Math.cos(userLatRadian) * Math.cos(stopLatRadian) * Math.cos(thetaRadian);
        dist = Math.acos(dist)
        dist = dist * 180 / Math.PI
        dist = dist * 60 * 1.1515
        unit == "K" ? dist = dist * 1.609344 : unit == "N" ? dist = dist * 0.8684 : false
        return dist
    }

    async checkNearby(stops) {
        let nearbyStopList = await stops.map((stop, index) => {
            {
                let obj = {
                    id: stop.id,
                    name: stop.name,
                    description: stop.description,
                    rating: stop.rating,
                    imgurl: stop.imgurl,
                    lat: stop.lat,
                    lng: stop.lng,
                    distance: this.distance(this.props.screenProps.mainState.userLat, this.props.screenProps.mainState.userLng, stop.lat, stop.lng, this.state.unit)
                }

                return obj
            }
        });
        await nearbyStopList.sort((a, b) => {
            return a.distance - b.distance
        })
        await this.setState({ stops: nearbyStopList })
    }

    componentWillReceiveProps() {
        this.checkNearby(this.props.screenProps.mainState.places);
    }

    async getDimensions() {
        let dims = await Dimensions.get('window');
        await this.setState({ dims })
    }

    widthPercentage(num) {
        let w = this.setState.dims.width / num;
        return w
    }

    heightPercentage(num) {
        let h = this.setState.dims.height / num;
        return h
    }

    async showStopDetails(id) {
        await this.props.screenProps.stopDetails(id)
        await this.props.navigation.navigate('Details')
    }


    nearbyStops() {
        let mappedStopsNearby = this.state.stops.map((stop, index) => {
            let $distance;
            stop.distance.toFixed(1) == 0.0 ? $distance = 0 : $distance = stop.distance.toFixed(1)
            return (
                <View
                    key={index}
                    style={{
                        height: 250, width: this.state.dims.width, alignItems: 'center'
                    }}
                >
                    <Image source={{ uri: `${stop.imgurl}` }}
                        style={{ flex: 6, width: '100%' }} />
                    <View style={{ flex: 1, flexDirection: 'row', width: '100%', padding: 3 }}>
                        <View style={{
                            flex: 1, flexDirection: 'row', justifyContent: 'flex-start', width: '100%',
                            alignItems: 'center', paddingLeft: 3
                        }}>
                            <Icon
                                name="star"
                                type='font-awesome'
                                size={12}
                                containerStyle={{ alignSelf: 'center' }}
                                color='goldenrod'
                            />
                            <View>
                                <Text style={{ color: 'goldenrod' }}>1004</Text>
                            </View>
                        </View>
                        <Text
                            style={{
                                alignSelf: 'center',
                                fontSize: 26,
                                color: 'black'
                            }}
                            onPress={() => this.showStopDetails(stop.id)}
                        >
                            {stop.name}
                        </Text>
                        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', paddingRight: 3 }}>
                            <Text>{$distance} mi</Text>
                        </View>
                    </View>
                </View>
            )
        })
        // console.log(mappedStopsNearby)
        return mappedStopsNearby

    }

    searchResults() {
        let keyword = this.state.search;
        let results = this.state.stops.filter((stop, index) => {
            return stop.name.toLowerCase().includes(keyword.toLowerCase())
        })

        this.setState({ results })
    }

    results() {
        let results;
        let mappedResults = this.state.results.map((stop, index) => {
            let $distance;
            stop.distance.toFixed(1) == 0.0 ? $distance = 0 : $distance = stop.distance.toFixed(1)
            return (
                <View
                    key={index}
                    style={{
                        height: 250, width: this.state.dims.width, alignItems: 'center'
                    }}
                >
                    <Image source={{ uri: `${stop.imgurl}` }}
                        style={{ flex: 6, width: '100%' }} />
                    <View style={{ flex: 1, borderBottomWidth: 1, borderColor: 'black' ,flexDirection: 'row', width: '100%', padding: 3 }}>
                        <View style={{
                            flex: 1, flexDirection: 'row', justifyContent: 'flex-start', width: '100%',
                            alignItems: 'center', paddingLeft: 3
                        }}>
                            <Icon
                                name="star"
                                type='font-awesome'
                                size={12}
                                containerStyle={{ alignSelf: 'center' }}
                                color='goldenrod'
                            />
                            <View>
                                <Text style={{ color: 'goldenrod' }}>1004</Text>
                            </View>
                        </View>
                        <Text
                            style={{
                                alignSelf: 'center',
                                fontSize: 26,
                                color: 'black'
                            }}
                            onPress={() => this.showStopDetails(stop.id)}
                        >
                            {stop.name}
                        </Text>
                        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', paddingRight: 3 }}>
                            <Text>{$distance} mi</Text>
                        </View>
                    </View>
                </View>
            )
        })
        return mappedResults
    }





    render() {
        // console.log(this.state.stops)
        let cellWidth = this.state.dims.width;
        let cellHeight = this.state.dims.height;
        // console.log(Dimensions.get('window'))
        let $browse;
        let $results;
        this.state.search !== ''
            ?
            $results =
            <ScrollView
                style={{ flex: 1 }}
                horizontal={true}
                pagingEnabled={true}
                decelerationRate={0}
                snapToAlignment='center'
                snapToInterval={cellWidth}

            >
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                    {this.results()}
                </View>
            </ScrollView>
            :
            $results = <Image source={Logo} style={{ height: '40%', width: '40%', alignSelf: 'center' }} />
        this.state.isSorted
            ?
            $browse =

            <View style={{ height: cellHeight - 70, flexDirection: 'column', width: '100%', alignItems: 'flex-end', justifyContent: 'flex-end', padding: 0 }}>
                <View style={{ height: 55, alignSelf: 'center', alignItems: 'center', width: "100%", backgroundColor: 'white' }}>
                    <View style={{ alignSelf: 'center' }}>
                        <View style={{ flexDirection: 'row', width: '90%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', borderColor: 'grey', borderWidth: 1, borderRadius: 20, paddingLeft: 10, marginTop: 5, marginBottom: 5 }}>
                            <TextInput
                                style={{ width: '90%', marginLeft: 10 }}
                                placeholder="Search"
                                ref={(el) => { this.search = el; }}
                                onChangeText={async (search) => { await this.setState({ search }); await this.searchResults(search) }}
                                value={this.state.search}
                            />


                            <TouchableOpacity>
                                <Icon
                                    name="search"
                                    type='font-awesome'
                                    size={26}
                                    containerStyle={{ alignSelf: 'center', marginRight: 10 }}
                                    color='grey'
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <Text style={{ flex: 0.135, fontSize: 26, alignSelf: 'center' }}>- Results -</Text>
                {$results}
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ flex: 1, flexDirection: 'column', textAlignVertical: 'bottom', textAlign: 'center', fontSize: 26 }}>
                        - Nearby Stops -
                </Text>
                </View>


                <ScrollView
                    style={{ flex: 1 }}
                    horizontal={true}
                    pagingEnabled={true}
                    decelerationRate={0}
                    snapToAlignment='center'
                    snapToInterval={cellWidth}

                >
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                        {this.nearbyStops()}
                    </View>
                </ScrollView>
            </View>
            :
            $browse = <Text>Loading...</Text>

        return (
            $browse
        )
    }
}