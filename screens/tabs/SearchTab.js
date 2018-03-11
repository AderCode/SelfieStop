import React, { Component } from 'react'
import {
    ScrollView,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native'
import { Icon } from 'react-native-elements'

export default class SearchTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            unit: 'M',
            stops: [],
            isSorted: false
        }

    }

    async componentDidMount() {
        await this.checkNearby(this.props.screenProps.mainState.places);
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

    nearbyStops() {
        let mappedStopsNearby = this.state.stops.map((stop, index) => {
            let $distance;
            stop.distance.toFixed(1) == 0.0 ? $distance = 0 : $distance = stop.distance.toFixed(1)
            return (
                <View key={index} style={{
                    height: 250, width: 413, alignItems: 'center'
                }}>

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

                        <Text style={{ alignSelf: 'center', fontSize: 26, color: 'black' }}>{stop.name}</Text>


                        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', paddingRight: 3 }}>
                            <Text>{$distance} mi</Text>
                        </View>

                    </View>



                </View>
            )
        })
        console.log(mappedStopsNearby)
        return mappedStopsNearby

    }

    render() {
        console.log(this.state)
        let $browse;
        this.state.isSorted
            ?
            $browse =

            <View style={{ flex: 1, flexDirection: 'column', width: '100%', alignItems: 'flex-end', justifyContent: 'flex-end', padding: 0 }}>
<View style={{ flex: 0.225, alignSelf: 'center', alignItems: 'center', width: "100%", backgroundColor: 'white' }}>
                <View style={{ alignSelf: 'center'}}>
                    <View style={{ flexDirection: 'row', width: '90%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', borderColor: 'grey', borderWidth: 1, borderRadius: 20, paddingLeft: 10, marginTop: 3}}>
                        <TextInput
                            style={{ width: '90%' }}
                            placeholder="   Search"
                        />
                        <TouchableOpacity>
                        <Icon
                            name="search"
                            type='font-awesome'
                            size={26}
                            containerStyle={{ alignSelf: 'center' }}
                            color='grey'
                        />
                        </TouchableOpacity>
                    </View>
                    </View> 
                    </View>
                    <Text style={{fontSize: 26, alignSelf: 'center'}}>- Results -</Text>

               

                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text style={{ flex: 1, flexDirection: 'column', textAlignVertical: 'bottom', textAlign: 'center', fontSize: 26 }}>
                        - Nearby Stops -
                </Text>
                </View>


                <ScrollView
                    style={{ flex: 1 }}
                    automaticallyAdjustInsets={false}
                    horizontal={true}
                    pagingEnabled={true}
                    decelerationRate={0}
                    snapToAlignment='center'
                    snapToInterval={414}
                    scrollEventThrottle={8}
                    onScroll={(event) => {
                        var contentOffsetX = event.nativeEvent.contentOffset.x;
                        var contentOffsetY = event.nativeEvent.contentOffset.y;

                        var cellWidth = (412).toFixed(2);
                        var cellHeight = (222).toFixed(2);

                        var cellIndex = Math.floor(contentOffsetX / cellWidth);

                        // Round to the next cell if the scrolling will stop over halfway to the next cell.
                        if ((contentOffsetX - (Math.floor(contentOffsetX / cellWidth) * cellWidth)) > cellWidth / 2) {
                            cellIndex++;
                        }
                        contentOffsetX = cellIndex * cellWidth;
                        contentOffsetY = cellIndex * cellHeight;

                        event.nativeEvent.contentOffsetX = contentOffsetX;
                        event.nativeEvent.contentOffsetY = contentOffsetY;
                    }}
                >
                    <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between' }}>
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