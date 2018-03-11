import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
} from "react-native";
import { Icon } from "react-native-elements";
import ImagePicker from 'react-native-image-picker'
import LinearGradient from 'react-native-linear-gradient'

// COMPONENTS
import Map from '../../components/Map'


let options = {
    title: 'Take a Selfie',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

export default class MapTab extends Component {
    cam() {
        ImagePicker.launchCamera(options, (response) => { });
    }

    navigate(screen) {
        this.props.navigation.navigate(`${screen}`)
    }

    render() {
        console.log(this.props)
        return (
            <View style={{ flex: 1}}>

                <View style={{
                    height: 50,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    flexDirection: 'row',
                    padding: 10
                }}>

                <TouchableNativeFeedback
                        onPress={() => this.cam()}>
                        <Icon
                            name="camera"
                            type="entypo"
                            size={26}
                            underlayColor={'rgb(3, 0, 255)'}
                            containerStyle={{flex: 1, alignItems: 'baseline', justifyContent: 'center'}}
                        />
                    </TouchableNativeFeedback>

                    <Text 
                        style={{
                            flex: 2, 
                            alignSelf: 'center',
                            justifyContent: 'center',
                            fontSize: 26,
                            color: 'black'
                        }}>
                            Selfie Stops
                        </Text>
                </View>

                <View style={styles.map}>
                    <Map region={{
                        latitude: this.props.screenProps.mainState.userLat,
                        longitude: this.props.screenProps.mainState.userLng,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005
                    }}
                        style={{ width: '100%', height: '100%' }}
                        mainState={this.props.screenProps.mainState}
                        navigation={this.props.navigation}
                        stopDetails={this.props.screenProps.stopDetails}
                    >

                    </Map>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { backgroundColor: "transparent" },
    map: {
        backgroundColor: "transparent",
        height: '100%',
        width: '100%',
        alignSelf: 'center'
    },
});
