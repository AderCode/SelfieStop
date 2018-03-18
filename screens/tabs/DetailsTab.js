import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Linking
} from 'react-native'
import { Icon } from 'react-native-elements'
import MapView, { Marker } from 'react-native-maps'

import Flag from '../../images/stop_pin.png'

export default class DetailsTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isStarred: false,
            rating: this.props.screenProps.mainState.stop.rating
        }
    }

    handleStars() {
        this.state.isStarred
        ?
        this.removeStar()
        :
        this.addStar()
    }

    addStar() {
        this.state.rating += 1
        this.setState({ isStarred: true });
    }

    removeStar() {
        this.state.rating -= 1
        this.setState({ isStarred: false });
    }

    reroll() {
        this.props.screenProps.stopDetails(false)
    }

    render() {
        let $star;
        this.state.isStarred ? $star = "star" : $star ="star-o"
        // console.log('DetailsTab props: ', this.props.screenProps.mainState.stop.imgurl)
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
                            <TouchableOpacity
                                onPress={() => this.handleStars()}
                                >
                                <Icon
                                    name={$star}
                                    type='font-awesome'
                                    size={26}
                                    containerStyle={{ marginLeft: 20, marginTop: 10 }}
                                    color="gold"
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
                                }}><Text>{this.state.rating}</Text></View>
                        </View>

                        <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <TouchableOpacity
                            onPress={() => this.reroll()}
                            >
                                <Icon
                                    name="cycle"
                                    type='entypo'
                                    size={26}
                                    containerStyle={{ marginRight: 20, marginTop: 10 }}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                            onPress={()=> Linking.openURL(`http://maps.google.com/maps?daddr=${this.props.screenProps.mainState.stop.lat},${this.props.screenProps.mainState.stop.lng}`)}
                            >
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
                            image={Flag}
                        />
                    </MapView>

                </View>

            </View>
        )
    }
}