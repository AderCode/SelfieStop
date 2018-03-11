import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native'
import { Icon } from 'react-native-elements'
import MapView, { Marker } from 'react-native-maps'

export default class DetailsTab extends Component {




    render() {
        console.log('DetailsTab props: ', this.props.screenProps.mainState.stop.imgurl)
        return (
            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                <View style={{ flex: 1.2, backgroundColor: 'white', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 26 }}>{this.props.screenProps.mainState.stop.name}</Text>
                </View>
                <View style={{ flex: 5, backgroundColor: 'white', width: '100%', justifyContent: 'center' }}>
                    <Image source={{ uri: `${this.props.screenProps.mainState.stop.imgurl}` }} style={{ flex: 1 }} />
                </View>



                <View style={{
                    flex: 8, width: '100%', alignSelf: 'center', borderColor: 'black',
                    paddingBottom: 10, backgroundColor: 'white'
                }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start' }}>

                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <TouchableOpacity>
                                <Icon
                                    name="star-o"
                                    type='font-awesome'
                                    size={26}
                                    containerStyle={{ marginLeft: 20, marginTop: 10 }}
                                />
                            </TouchableOpacity>

                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: 14,
                                    marginLeft: 10,
                                    borderColor: 'grey',
                                    borderRadius: 5,
                                    borderWidth: 1,
                                    paddingLeft: 4,
                                    paddingRight: 4
                                }}><Text>1004</Text></View>
                        </View>

                        <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <TouchableOpacity>
                                <Icon
                                    name="cycle"
                                    type='entypo'
                                    size={26}
                                    containerStyle={{ marginRight: 20, marginTop: 10 }}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Icon
                                    name="direction"
                                    type='entypo'
                                    size={26}
                                    containerStyle={{ marginRight: 20, marginTop: 10 }}
                                />
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={{ flex: 2, marginTop: 10, paddingLeft: 10, paddingRight: 10 }}>

                        <Text>{this.props.screenProps.mainState.stop.description}</Text>
                    </View>
                    <MapView
                        region={{
                            latitude: this.props.screenProps.mainState.stop.lat,
                            latitudeDelta: 0.003,
                            longitude: this.props.screenProps.mainState.stop.lng,
                            longitudeDelta: 0.002
                        }}
                        style={{ flex: 5 }}
                        liteMode
                    >
                        <Marker
                            coordinate={{
                                latitude: this.props.screenProps.mainState.stop.lat,
                                longitude: this.props.screenProps.mainState.stop.lng
                            }}
                            // image={img}
                        />
                    </MapView>

                </View>

            </View>
        )
    }
}