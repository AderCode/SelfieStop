import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    AsyncStorage
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

    async logout() {
        await AsyncStorage.multiRemove(['auth', 'userId']);
        await this.navigate('Splash')
    }

    async fetchLogout() {
        // console.log('fetch activated')
        let token = await AsyncStorage.getItem("auth");
        let userid = await AsyncStorage.getItem("userId");
        let apiUrl = `https://powerful-savannah-66747.herokuapp.com/api/auth/logout/${userid}`
        let ipUrl = `https://smjetissah.localtunnel.me/api/auth/logout/${userid}`
        let data = { userid }
        try {
            let results = await fetch({ url: apiUrl }, {
                body: JSON.stringify(data), // must match 'Content-Type' header
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'content-type': 'application/json'
                },
                method: 'DELETE',
            });
            // await console.log(results)
            await results.status !== 200
                ?
                true
                :
                await this.logout();

        } catch (e) {
            // console.log(e);
            return;
        }
    }

    async checkAsyncStorage() {
        // PRODUCTION VALUES
        let tokVal = await AsyncStorage.getItem("auth")
        let usrVal = await AsyncStorage.getItem("userId")
        // await console.log(tokVal)
        // await console.log(usrVal)

        // let allKeys = await AsyncStorage.getAllKeys()
        // await console.log(allKeys)

    }

    navigate(screen) {
        this.props.screenProps.navigate(`${screen}`)
    }

    render() {
        // console.log(this.props)
        return (
            <View style={{ flex: 1 }}>

                <View style={{
                    height: 50,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    flexDirection: 'row',
                    padding: 10
                }}>


                    <View style={{ flex: 1, alignItems: 'baseline', justifyContent: 'center' }}>
                        <TouchableOpacity
                            onPress={() => this.cam()}>
                            <Icon
                                name="camera"
                                type="entypo"
                                size={26}
                                underlayColor={'rgb(3, 0, 255)'}
                            />
                        </TouchableOpacity>
                    </View>


                    <Text
                        style={{
                            flex: 2,
                            textAlign: 'center',
                            justifyContent: 'center',
                            fontSize: 26,
                            color: 'black'
                        }}>
                        Selfie Stops
                        </Text>

                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                        <TouchableOpacity
                            onPress={() => this.fetchLogout()}
                        >
                            <Icon
                                name="log-out"
                                type="feather"
                                size={26}
                                underlayColor={'rgb(3, 0, 255)'}
                            />
                        </TouchableOpacity>
                    </View>

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
