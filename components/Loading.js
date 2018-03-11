import React, { Component } from 'react'
import {
    View,
    Image,
    Text,
    ActivityIndicator,
    StyleSheet
} from 'react-native'

import SplashLogo from '../images/splash_logo.png'


export default class Loading extends Component {



    render() {
        return (
            <View style={styles.root}>
                <Image source={SplashLogo} style={styles.logo} />
                <Text style={styles.label}>
                    Loading...
                </Text>
                <ActivityIndicator size='large' />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    logo: {
        height: '50%',
        width: '50%',
        alignSelf: 'center',
        margin: 20
    },
    label: {
        textAlign: 'center',
        margin: 20,
        fontSize: 40,
    },
    loading: {
        fontSize: 40
    }
});