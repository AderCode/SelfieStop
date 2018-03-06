import React, { Component } from "react";
import { View } from "react-native";
import { Icon } from "react-native-elements";
import ImagePicker from 'react-native-image-picker'

export default class NavBar extends Component {
    cam() {
        ImagePicker.launchCamera(options, (response) => { });
    }

    

    render() {
        return (
            <LinearGradient colors={['rgb(187, 32, 30)', 'rgb(229, 26, 0)', 'rgb(255, 29, 0)']}>
                <View style={{ 
                    backgroundColor: 'transparent',
                    alignItems: 'center', 
                    flexDirection: 'row', 
                    justifyContent: 'space-around', 
                    borderColor: 'black', 
                    borderTopWidth: 2.5, 
                    padding: 2, 
                }}>

                    <Icon
                        name="home"
                        type="entypo"
                        onPress={() => {return}}
                        size={50}
                        iconStyle={{textShadowColor: "maroon", textShadowOffset: {width: 4, height: 2}, textShadowRadius: 1, padding: 5}}
                        underlayColor={'maroon'}
                    />

                    <Icon
                        name="search-plus"
                        type="font-awesome"
                        onPress={() => {return}}
                        size={50}
                        iconStyle={{textShadowColor: "maroon", textShadowOffset: {width: 4, height: 2}, textShadowRadius: 1, padding: 5}}
                        underlayColor={'maroon'}

                    />


                    <Icon
                        name="camera"
                        type="entypo"
                        onPress={() => this.cam()}
                        size={50}
                        iconStyle={{textShadowColor: "maroon", textShadowOffset: {width: 4, height: 2}, textShadowRadius: 1, padding: 5}}
                        underlayColor={'maroon'}
                    />

                    <Icon
                        name="add-location"
                        type="materialicons"
                        onPress={() => this.navigate('Upload')}
                        size={50}
                        iconStyle={{textShadowColor: "maroon", textShadowOffset: {width: 3, height: 2}, textShadowRadius: 1, padding: 5}}
                        underlayColor={'maroon'}
                    />

                    <Icon
                        name="list"
                        type="foundation"
                        onPress={() => this.navigate('Upload')}
                        size={50}
                        iconStyle={{textShadowColor: "maroon", textShadowOffset: {width: 3, height: 2}, textShadowRadius: 1, margin: 5}}
                        underlayColor={'maroon'}
                    />
                </View>
                </LinearGradient>
                )
    }

}