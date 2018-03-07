import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    AsyncStorage
} from 'react-native'
import { TabNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements'
import SplashLogo from '../images/splash_logo.png'

//Tab Screens
import LoginTab from './tabs/LoginTab'
import RegisterTab from './tabs/RegisterTab'

const TabNavigation = TabNavigator({
    Login: { screen: LoginTab },
    Register: { screen: RegisterTab }
});



export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authChecked: false, // set to false for production build
            isLoggedIn: false //false // set to false for production build
        }
    }

    async componentDidMount() {
        await this.handleCheckAuth();
    }

    async handleCheckAuth() {
        try {
            this.state.isLoggedIn ? this.handleNavigate('Home') : this.setState({ authChecked: true }) // !!!Needs to check AsyncStorage for token
        } catch (error) {
            console.log(error)
        }
    }

    handleNavigate(screen) {
        this.props.navigation.navigate(`${screen}`)
    }

    // !!! Needs to have logo and loading indicator
    handleSplash() {
        return (
            <View style={styles.root}>
                <Image source={SplashLogo} style={styles.logo}/>
                <Text style={styles.label}> 
                    Loading...
                </Text>
                <Icon
                name='loader'
                type='feather'
                size={40}
                color='rgb(0, 142, 255)'
                />
            </View>
        )
    }

    handleLogin() {
        return (
            <TabNavigation screenProps={{ navigate: this.handleNavigate.bind(this)}} />
        )
    }

    render() {
        return this.state.authChecked ? this.handleLogin() : this.handleSplash()
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